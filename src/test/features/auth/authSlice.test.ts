import {
    AuthState,
    addToken,
    removeToken,
} from "../../../redux/auth/authSlice";
import createStore from "../../../redux/store/store";

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
