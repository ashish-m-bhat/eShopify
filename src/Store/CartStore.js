import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{},
    reducers:{

        // Create a DB with a table 'cart' when user logs in
        instantiateDB(){
            const createRequest = indexedDB.open('userDB', 1);
            createRequest.onupgradeneeded = e =>{
                const db = createRequest.result;
                if(!db.objectStoreNames.contains('cart'))
                    db.createObjectStore('cart', {keyPath:'id'});
            }
        },

        // When user logs out, delete the DB
        deleteDB(){
            indexedDB.deleteDatabase('userDB');
        },

        // Add an item to the cart
        // Two cases : Item already exists in the cart, hence increase by 1. Else, add it to the cart table
        addItemToCart(state, action){
            const itemToAdd = { id:action.payload.id,
                                title:action.payload.title,
                                email:action.payload.email,
                                count:1,
                                price:action.payload.price,
                                image: action.payload.image,
                                href:action.payload.href};
            const openRequest = indexedDB.open('userDB', 1); // DB already exists
            openRequest.onsuccess = e =>{
                const db =openRequest.result;
                const cartStore = db.transaction('cart', 'readwrite').objectStore('cart');

                const getObjRequest = cartStore.openCursor(action.payload.id);
                getObjRequest.onsuccess = e => {
                    var cursor = e.target.result;

                    // If item already exists in the cart, update the count
                    if (cursor){
                        cursor.update({...itemToAdd ,count:cursor.value.count + 1 });
                        alert("Added");
                    }
                    // If not, add it
                    else{
                        const writeReq = cartStore.add(itemToAdd);
                        writeReq.onsuccess = e => alert("Added");
                        writeReq.onerror = e => alert("Failed to Add");
                    }
                }
            }
        },

        // Decrease the count of the item. If equal to or less than 0, remove it from cart table.
        removeItemFromCart(state, action){
            const itemToAdd = { id:action.payload.id,
                                title:action.payload.title,
                                email:action.payload.email,
                                count:1,
                                price:action.payload.price,
                                image: action.payload.image,
                                href:action.payload.href};
            const openRequest = indexedDB.open('userDB', 1); // DB already exists
            openRequest.onsuccess = e =>{
                const db =openRequest.result;
                const cartStore = db.transaction('cart', 'readwrite').objectStore('cart');

                const getObjRequest = cartStore.openCursor(action.payload.id);
                getObjRequest.onsuccess = e => {
                    var cursor = e.target.result;

                    if (cursor){
                        // Count is zero, remove the item
                        if(cursor.value.count - 1 <= 0){
                            cartStore.delete(itemToAdd.id);
                            alert("Removed");
                            window.location.reload(); // Rerender the cart component
                        }
                        else{
                            cursor.update({...itemToAdd ,count:cursor.value.count - 1 });
                            alert("Removed");
                        }
                    }
                }
            }
        }, // addItemToCart()


        // Empty the cart after an order has been placed
        emptyCart(){
            const clearRequest = indexedDB.open('userDB', 1);
            clearRequest.onsuccess = e =>{
                clearRequest.result.transaction('cart', 'readwrite').objectStore('cart').clear();
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
