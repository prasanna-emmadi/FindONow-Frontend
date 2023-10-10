import createStore from "../../../app/store";
import {
    SortOrder,
    addProducts,
    searchBy,
    sortBy,
} from "../../../features/product/productSlice";
import products from "../../data/productData";

describe("cart slice reducer", () => {
    let store: any;

    beforeEach(() => {
        store = createStore();
    });

    test("addProducts", () => {
        store?.dispatch(addProducts([]));
        expect(store?.getState().product.products.length).toBe(0);
        store?.dispatch(addProducts(products));
        expect(store?.getState().product.products.length).toBe(2);
    });

    test("sortBy", () => {
        store?.dispatch(addProducts(products));
        store?.dispatch(sortBy(SortOrder.Increasing));
        expect(store?.getState().product.products[0].title).toBe(
            "Elegant Bronze Mouse",
        );
        store?.dispatch(sortBy(SortOrder.Decreasing));
        expect(store?.getState().product.products[0].title).toBe(
            "Incredible Metal Hat",
        );
    });
    test("searchBy", () => {
        store?.dispatch(searchBy("Metal"));
        expect(store?.getState().product.products.length).toBe(1);
        expect(store?.getState().product.products[0].title).toBe(
            "Incredible Metal Hat",
        );
    });
});
