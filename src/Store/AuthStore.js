import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn:localStorage.getItem('isUserLoggedIn'),
    email:localStorage.getItem('email'),
    username: localStorage.getItem('username'),
}

// the auth reducer has an initial state isUserLoggedIn which is set using the localStorage item, isUserLoggedIn
const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        login(state, action){
            state.isUserLoggedIn = true;
            state.email = action.payload.email;
            state.username = action.payload.email.split('@')[0];
            localStorage.setItem('isUserLoggedIn',true);
            localStorage.setItem('email', state.email);
            localStorage.setItem('username', state.username);
        },
        logout(state){
            state.isUserLoggedIn = false;
            state.email = '';
            state.username = '';
            localStorage.clear();
        }

    }
});

export default authSlice;
export const authActions = authSlice.actions;