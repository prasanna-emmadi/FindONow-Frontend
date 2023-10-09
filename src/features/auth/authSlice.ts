import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    access_token?: string;
    refresh_token?: string;
}

const initialState: AuthState = {
    access_token: undefined,
    refresh_token: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<AuthState>) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        removeToken: (state) => {
            state.access_token = undefined;
            state.refresh_token = undefined;
        },
    },
});

export const { addToken, removeToken } = authSlice.actions;

export default authSlice;
