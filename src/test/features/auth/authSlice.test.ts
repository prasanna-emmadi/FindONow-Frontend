import createStore from "../../../app/store";
import {
    AuthState,
    addToken,
    removeToken,
} from "../../../features/auth/authSlice";

describe("auth slice reducer", () => {
    const state: AuthState = {
        access_token: "access_token",
        refresh_token: "refresh_token",
    };
    let store: any;

    beforeEach(() => {
        store = createStore();
    });

    test("addToken and removeToken", () => {
        store?.dispatch(addToken(state));
        expect(store?.getState().auth.access_token).toBe(state.access_token);
        store?.dispatch(removeToken());
        expect(store?.getState().auth.access_token).toBe(undefined);
    });
});
