import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async(obj) =>{
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
         getObjRequest.onsuccess = e => {
             var cursor = e.target.result;      //getObjRequest.result

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
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async(obj) =>{
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
        getObjRequest.onsuccess = e => {
            let cursor = e.target.result;       //getObjRequest.result

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

const cartSlice = createSlice({
    name:'cart',
    initialState:{'status':null},
    reducers:{

        // When user logs out, delete the DB
        deleteDB(){
            indexedDB.deleteDatabase('userDB');
        },
},
  extraReducers:{
        [instantiateDB.pending]:(state) =>{
            state.status = 'instantiateDB pending';
            console.log('instantiateDB pending');
        },
        [instantiateDB.fulfilled]:(state) =>{
            state.status = 'instantiateDB fulfilled';
            console.log('instantiateDB fulfilled');
        },
        [instantiateDB.rejected]:(state) =>{
            state.status = 'instantiateDB rejected';
            console.log('instantiateDB rejected');
        },

        [addItemToCart.pending]:(state) =>{
            state.status = 'addItemToCart pending';
            console.log('addItemToCart pending');
        },
        [addItemToCart.fulfilled]:(state) =>{
            state.status = 'addItemToCart fulfilled';
            console.log('addItemToCart fulfilled');
        },
        [addItemToCart.rejected]:(state) =>{
            state.status = 'addItemToCart rejected';
            console.log('addItemToCart rejected');
        },

        [removeItemFromCart.pending]:(state) =>{
            state.status = 'removeItemFromCart pending';
            console.log('removeItemFromCart pending');
        },
        [removeItemFromCart.fulfilled]:(state) =>{
            state.status = 'removeItemFromCart fulfilled';
            console.log('removeItemFromCart fulfilled');
        },
        [removeItemFromCart.rejected]:(state) =>{
            state.status = 'removeItemFromCart rejected';
            console.log('removeItemFromCart rejected');
        },

        [emptyCart.pending]:(state) =>{
            state.status = 'emptyCart pending';
            console.log('emptyCart pending');
        },
        [emptyCart.fulfilled]:(state) =>{
            state.status = 'emptyCart fulfilled';
            console.log('emptyCart fulfilled');
        },
        [emptyCart.rejected]:(state) =>{
            state.status = 'emptyCart rejected';
            console.log('emptyCart rejected');
        },



    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
