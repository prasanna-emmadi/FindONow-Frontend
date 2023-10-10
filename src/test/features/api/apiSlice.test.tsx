import { render, screen } from "@testing-library/react";
import server from "../../shared/userServer";
import createStore from "../../../app/store";
import Products from "../../../components/Products/Products";
import { Provider } from "react-redux";
import Users from "../../../components/Users";

let store = createStore();

beforeEach(() => {
    store = createStore();
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Test apiSlice async actions", () => {
    test("Should fetch all products", async () => {
        render(
            <Provider store={store}>
                <Products />
            </Provider>,
        );
        await screen.findByTestId("products", undefined, { timeout: 60000 });
        const getProducts: any =
            store.getState().api.queries["getProducts(undefined)"];
        expect(getProducts.data.length).toBeGreaterThan(0);
    }, 30000);

    test("Should fetch all users", async () => {
        render(
            <Provider store={store}>
                <Users />
            </Provider>,
        );
        await screen.findByTestId("users", undefined, {
            timeout: 60000,
        });
        const getUsers: any =
            store.getState().api.queries["getUsers(undefined)"];
        expect(getUsers.data.length).toBeGreaterThan(0);
    });
});
