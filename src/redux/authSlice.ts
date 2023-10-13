import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/userType";

interface Token {
    access_token?: string;
    refresh_token?: string;
}

export interface AuthState {
    token: Token;
    user?: UserType;
}

const initialState: AuthState = {
    token: { access_token: undefined, refresh_token: undefined },
    user: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<Token>) => {
            state.token.access_token = action.payload.access_token;
            state.token.refresh_token = action.payload.refresh_token;
        },
        removeToken: (state) => {
            state.token.access_token = undefined;
            state.token.refresh_token = undefined;
            state.user = undefined;
        },
        addUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = undefined;
        },
    },
});

export const { addToken, removeToken, addUser, removeUser } = authSlice.actions;

export default authSlice;
