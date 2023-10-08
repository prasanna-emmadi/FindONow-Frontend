import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    access_token?: string;
    refresh_token?: string;
}

const initialState: AuthState = {
    access_token: undefined,
    refresh_token: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<AuthState>) => {
            state = action.payload;
        },
        removeToken: (state) => {
            state = initialState;
        },
    },
});

export const { addToken } = userSlice.actions;

export default userSlice;
