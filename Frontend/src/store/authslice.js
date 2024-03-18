import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}
const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload
        },
        logout: (state) => {
            state.status = false
        }
    }
})
export const { login, logout } = authslice.actions
export default authslice.reducer