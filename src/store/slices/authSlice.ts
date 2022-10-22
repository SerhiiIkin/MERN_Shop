import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPayload, AuthPayloadRegister } from "../../models/models";

const TOKEN_KEY = "TOKEN_KEY";
const USERNAME_KEY = "USERNAME_KEY";
const EXPIRES_KEY = "EXPIRES_KEY";
const USERROLE_KEY = "USERROLE_KEY"

function initialState() {
    const expiresIn = localStorage.getItem(EXPIRES_KEY) ?? null;

    if (expiresIn && new Date() > new Date(expiresIn)) {
        return {
            token: "",
            error: "",
            username: "",
            role:"",
            isAuth: false,
            message: "",
        };
    }

    return {
        token: localStorage.getItem(TOKEN_KEY) ?? "",
        error: "",
        username: localStorage.getItem(USERNAME_KEY) ?? "",
        isAuth: Boolean(localStorage.getItem(TOKEN_KEY)),
        role: localStorage.getItem(USERROLE_KEY) || "",
        message: "",
    };
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        successLogin(state, action: PayloadAction<AuthPayload>) {
            state.error = "";
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.role = action.payload.role
            state.isAuth = Boolean(action.payload.token);

            const tokenExpires = new Date(
                new Date().getTime() + 24 * 60 * 60 * 1000
            );

            localStorage.setItem(TOKEN_KEY, action.payload.token);
            localStorage.setItem(USERNAME_KEY, action.payload.username);
            localStorage.setItem(EXPIRES_KEY, tokenExpires.toString());
            localStorage.setItem(USERROLE_KEY, action.payload.role)
        },
        successRegister(state, action: PayloadAction<AuthPayloadRegister>) {
            state.error = "";
            state.message = action.payload.message;
        },

        fetchError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },

        logout(state) {
            state.token = "";
            state.username = "";
            state.isAuth = false;
            state.error = "";

            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USERNAME_KEY);
            localStorage.removeItem(EXPIRES_KEY);
            localStorage.removeItem(USERROLE_KEY);
        },
    },
});

export default authSlice.reducer;
