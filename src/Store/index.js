import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthStore";
import productsSlice from "./ProductsStore";

const reduxStore = configureStore({
    reducer:{auth:authSlice.reducer, products:productsSlice.reducer}
});
export default reduxStore;