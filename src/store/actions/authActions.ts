import { AppDispatch } from "..";
import axios from "../../axios";
import { AuthPayloadRegister } from "../../models/models";
import { authSlice } from "../slices/authSlice";

interface AuthResponse {
    token: string;
    user: {
        username: string;
        id: string;
        role: string;
    };
}

interface AuthData {
    username: string;
    password: string;
}

export function login(data: AuthData) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<AuthResponse>(
                "api/auth/login",
                data
            );

            dispatch(
                authSlice.actions.successLogin({
                    username: response.data.user.username,
                    token: response.data.token,
                    role: response.data.user.role,
                })
            );
        } catch (error: any) {
            console.dir(error);

            dispatch(authSlice.actions.fetchError(error?.message || "cant login"));
        }
    };
}

export function register(data: AuthData) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<AuthPayloadRegister>(
                "api/auth/register",
                data
            );

            dispatch(
                authSlice.actions.successRegister({
                    message: response.data.message,
                })
            );
        } catch (error: any) {
            console.log(error);

            dispatch(authSlice.actions.fetchError(error.response.data.message));
        }
    };
}
