import { render, screen } from "@testing-library/react";
import server from "../../shared/userServer";
import createStore from "../../../app/store";
import Products from "../../../components/Products/Products";
import { Provider } from "react-redux";

let store = createStore();
beforeEach(() => {
    store = createStore();
});
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Test apiSlice async actions", () => {
    test("Should fetch all products", async () => {
        // render /products
        // check the store.getState().products.
        render(
            <Provider store={store}>
                <Products />
            </Provider>,
        );
        // wait for products
        await screen.findByTestId("products", undefined, { timeout: 60000 });
        const getProducts: any =
            store.getState().api.queries["getProducts(undefined)"];
        console.log(getProducts);
        expect(getProducts.data.length).toBeGreaterThan(0);
    }, 30000);
});
