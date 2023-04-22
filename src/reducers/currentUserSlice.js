import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: {
        user: JSON.parse(localStorage.getItem('user')), 
        accessToken: JSON.parse(localStorage.getItem('accessToken')), 
        refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
    },
    reducers: {
        userLogin: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        userLogout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
});

export const { userLogin, userLogout } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;