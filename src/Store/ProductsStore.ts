import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./model";


// Thunk Middleware, gets called by LoadAllProductsFirstTime()
export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
});

interface InitialState {
    allProductsArray: Product[],
    status: string
}

const initialState: InitialState = {
    allProductsArray: [],
    status: ''
}

// Slice for products array
// setAllProducts is called using the fetchProducts() thunk in LoadAllProductsFirstTime()
const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            console.log(' action.payload;',  action.payload);

            state.allProductsArray = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.status = 'rejected';
        });

    }
});

export default productsSlice;
