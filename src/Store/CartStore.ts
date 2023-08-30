import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./model";

// Create a DB with a table 'cart' when user logs in
export const instantiateDB = createAsyncThunk('cart/instantiateDB', async() =>{
            const createRequest = indexedDB.open('userDB', 1);
            createRequest.onupgradeneeded = e =>{
                const db = createRequest.result;
                if(!db.objectStoreNames.contains('cart'))
                    db.createObjectStore('cart', {keyPath:'id'});
            }
});

// Add an item to the cart
// Two cases : Item already exists in the cart, hence increase by 1. Else, add it to the cart table
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async(obj: CartItem) =>{
    const itemToAdd = { id:obj.id,
                        title:obj.title,
                        email:obj.email,
                        count:1,
                        price:obj.price,
                        image: obj.image,
                        href:obj.href};
    const openRequest = indexedDB.open('userDB', 1); // DB already exists at this point
     openRequest.onsuccess = e =>{
         const db =openRequest.result;
         const cartStore = db.transaction('cart', 'readwrite').objectStore('cart');
         const getObjRequest = cartStore.openCursor(itemToAdd.id);
         getObjRequest.onsuccess = (event:any) => {
             var cursor = event!.target!.result;      //getObjRequest.result

            // If item already exists in the cart, update the count
            if (cursor){
                cursor.update({...itemToAdd ,count:cursor.value.count + 1 });
                alert("Added");
                window.location.reload(); // Rerender the cart component
            }
            // If not, add it
            else{
                const writeReq = cartStore.add(itemToAdd);
                writeReq.onsuccess = e => alert("Added to Cart");
                writeReq.onerror = e => alert("Failed to Add to Cart");
            }
        }
    }
});

// Decrease the count of the item. If equal to 0 or removeItemCompletely is set (incase of delete item), remove it from cart table.
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async(obj: CartItem) =>{
    const itemToRemove = { id:obj.id,
                        title:obj.title,
                        email:obj.email,
                        count:obj.count,
                        price:obj.price,
                        image:obj.image,
                        href:obj.href
                        };
    const openRequest = indexedDB.open('userDB', 1); // DB already exists at this point
    openRequest.onsuccess = e =>{
        const db =openRequest.result;
        const cartStore = db.transaction('cart', 'readwrite').objectStore('cart');

        const getObjRequest = cartStore.openCursor(itemToRemove.id);
        getObjRequest.onsuccess = (event: any) => {
            let cursor = event.target.result;       //getObjRequest.result

            if (cursor){
                // Count is zero, remove the item || Delete button was clicked
                if(cursor.value.count - 1 <= 0 || obj.removeItemCompletely === true){
                    cartStore.delete(itemToRemove.id);
                    alert("Removed From the Cart");
                    window.location.reload(); // Rerender the cart component
                }
                else{
                    cursor.update({...itemToRemove ,count:cursor.value.count - 1 });
                    alert("Removed From the Cart");
                    window.location.reload(); // Rerender the cart component
                }
            }
        }
    }
});

// Empty the cart after an order has been placed
export const emptyCart = createAsyncThunk('cart/emptyCart', async () =>{
    const clearRequest = indexedDB.open('userDB', 1);
    clearRequest.onsuccess = e =>{
        clearRequest.result.transaction('cart', 'readwrite').objectStore('cart').clear();
    }
});

type InitialState = {
    status: string
}

const initialState: InitialState = {
    status: ''
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{

        // When user logs out, delete the DB
        deleteDB(){
            indexedDB.deleteDatabase('userDB');
        },
    },
    extraReducers: (builder) => {

        // instantiateDB
        builder.addCase(instantiateDB.pending, (state, action) => {
            state.status = 'instantiateDB pending';
        });
        builder.addCase(instantiateDB.fulfilled, (state, action) => {
            state.status = 'instantiateDB fulfilled';
        });
        builder.addCase(instantiateDB.rejected, (state, action) => {
            state.status = 'instantiateDB rejected';
        });

        // addItemToCart
        builder.addCase(addItemToCart.pending, (state, action) => {
            state.status = 'addItemToCart pending';
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.status = 'addItemToCart fulfilled';
        });
        builder.addCase(addItemToCart.rejected, (state, action) => {
            state.status = 'addItemToCart rejected';
        });

        // removeItemFromCart
        builder.addCase(removeItemFromCart.pending, (state, action) => {
            state.status = 'removeItemFromCart pending';
        });
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.status = 'removeItemFromCart fulfilled';
        });
        builder.addCase(removeItemFromCart.rejected, (state, action) => {
            state.status = 'removeItemFromCart rejected';
        });

        // emptyCart
        builder.addCase(emptyCart.pending, (state, action) => {
            state.status = 'emptyCart pending';
        });
        builder.addCase(emptyCart.fulfilled, (state, action) => {
            state.status = 'emptyCart fulfilled';
        });
        builder.addCase(emptyCart.rejected, (state, action) => {
            state.status = 'emptyCart rejected';
        });
    }

});

export const cartActions = cartSlice.actions;
export default cartSlice;
