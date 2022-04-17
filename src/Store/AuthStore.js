import { createSlice } from "@reduxjs/toolkit";

// the auth reducer has an initial state isUserLoggedIn which is set using the localStorage item, isUserLoggedIn
const authSlice = createSlice({
    name:'auth',
    initialState:{isUserLoggedIn:localStorage.getItem('isUserLoggedIn')},
    reducers:{
        login(state){
            state.isUserLoggedIn = true;
            localStorage.setItem('isUserLoggedIn',true);
        },
        logout(state){
            state.isUserLoggedIn = false;
            localStorage.removeItem('isUserLoggedIn');
        }

    }
});

export default authSlice;
export const authActions = authSlice.actions;