import { createSlice } from "@reduxjs/toolkit";

// Slice for products array
// setAllProducts is called using the fetchProducts() thunk in LoadAllProductsFirstTime()
const productsSlice = createSlice({
    name:'products',
    initialState:{allProductsArray:[]},
    reducers:{
        setAllProducts(state, action){
            state.allProductsArray = action.payload;
        }
    }
});

// Thunk Middleware, gets called by LoadAllProductsFirstTime()
export function fetchProducts(){
    return async dispatch => {
       const response = await fetch('https://fakestoreapi.com/products');
       const data = await response.json();
       dispatch(productsSlice.actions.setAllProducts(data));
    }
}

export default productsSlice;
export const productsActions = productsSlice.actions;