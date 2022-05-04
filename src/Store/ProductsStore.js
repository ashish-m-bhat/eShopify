import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Thunk Middleware, gets called by LoadAllProductsFirstTime()
export const getProducts = createAsyncThunk('products/getProducts', async () => {
                                                                        return fetch('https://fakestoreapi.com/products').then(res => res.json( ))
                                                                    }
);

// Slice for products array
// setAllProducts is called using the fetchProducts() thunk in LoadAllProductsFirstTime()
const productsSlice = createSlice({
    name:'products',
    initialState:{allProductsArray:[],status:null},
    extraReducers:{
        [getProducts.pending] : (state) => {
            state.status = 'pending';
        },
        [getProducts.fulfilled] : (state, action) => {
            state.allProductsArray = action.payload;
            state.status = 'fulfilled';
        },
        [getProducts.rejected] : (state) =>{
            state.status = 'rejected';
        }

    }
});

export default productsSlice;