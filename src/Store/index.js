import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthStore";

const reduxStore = configureStore({
    reducer:{auth:authSlice.reducer}
});
export default reduxStore;