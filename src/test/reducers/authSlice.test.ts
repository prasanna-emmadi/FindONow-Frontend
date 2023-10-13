import { AuthState, addToken, removeToken } from "../../redux/auth/authSlice";
import createStore from "../../redux/store/store";

describe("auth slice reducer", () => {
    const state: AuthState = {
        token: {
            access_token: "access_token",
            refresh_token: "refresh_token",
        },
    };
    let store: any;

    beforeEach(() => {
        store = createStore();
    });

    test("addToken and removeToken", () => {
        store?.dispatch(addToken(state.token));
        expect(store?.getState().auth.token.access_token).toBe(
            state.token.access_token,
        );
        store?.dispatch(removeToken());
        expect(store?.getState().auth.token.access_token).toBe(undefined);
    });
});
