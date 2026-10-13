import { createSlice } from "@reduxjs/toolkit"

const storedAuth = localStorage.getItem("isAuth") === "true";
const registeredUsername = localStorage.getItem("username") || "";
const registeredEmail = localStorage.getItem("email") || "";
const registeredPassword = localStorage.getItem("password") || "";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: storedAuth
            ? { username: registeredUsername, email: registeredEmail, password: registeredPassword }
            : { username: "", email: "", password: "" },
        isAuth: storedAuth,
    },
    reducers: {
        login: (state, action) => {
            const userData = action.payload.user || action.payload;
            state.user = userData;
            state.isAuth = true;
            localStorage.setItem("isAuth", "true");
        },
        logout: (state) => {
            state.user = { username: "", email: "", password: "" };
            state.isAuth = false;
            localStorage.removeItem("isAuth");
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;