import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface UserState {
    access_token?: string
    refresh_token?: string
}

// Define the initial state using that type
const initialState: UserState = {
    access_token: undefined,
    refresh_token: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
        removeToken: ( state ) => {
            state = initialState;
        }

    }
})
export const { addToken } = userSlice.actions

export default userSlice