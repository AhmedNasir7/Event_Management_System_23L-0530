import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: { username: "", email: "", password: "" },
        isAuth: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuth = true;
        },
        logout: (state) => {
            state.user = { username: "", email: "", password: "" };
            state.isAuth = false;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer