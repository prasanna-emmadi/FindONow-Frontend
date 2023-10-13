import {
    SortOrder,
    addProducts,
    allCategoryProducts,
    productsOfCategory,
    reset,
    searchBy,
    sortByPrice,
    sortByTitle,
} from "../../redux/productSlice";
import createStore from "../../redux/store/store";
import products from "../data/productData";

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

    test("sortByTitle", () => {
        store?.dispatch(addProducts(products));
        store?.dispatch(sortByTitle(SortOrder.Increasing));
        expect(store?.getState().product.products[0].title).toBe(
            "Elegant Bronze Mouse",
        );
        store?.dispatch(sortByTitle(SortOrder.Decreasing));
        expect(store?.getState().product.products[0].title).toBe(
            "Incredible Metal Hat",
        );
    });
    test("sortByPrice", () => {
        store?.dispatch(addProducts(products));
        store?.dispatch(sortByPrice(SortOrder.Increasing));
        expect(store?.getState().product.products[0].price).toBe(794);
        store?.dispatch(sortByPrice(SortOrder.Decreasing));
        expect(store?.getState().product.products[0].price).toBe(902);
    });
    test("searchBy", () => {
        store?.dispatch(addProducts(products));
        store?.dispatch(searchBy("Metal"));
        expect(store?.getState().product.products.length).toBe(1);
        expect(store?.getState().product.products[0].title).toBe(
            "Incredible Metal Hat",
        );
    });

    test("productsOfCategory", () => {
        store?.dispatch(addProducts(products));
        store?.dispatch(productsOfCategory(4));
        expect(store?.getState().product.originalProducts.length).toBe(2);
        expect(store?.getState().product.products.length).toBe(1);
        expect(store?.getState().product.products[0].title).toBe(
            "Elegant Bronze Mouse",
        );
        store?.dispatch(allCategoryProducts());
        expect(store?.getState().product.originalProducts.length).toBe(2);
        expect(store?.getState().product.products.length).toBe(2);
    });
    test("reset", () => {
        store?.dispatch(addProducts(products));
        expect(store?.getState().product.originalProducts.length).toBe(2);
        store?.dispatch(productsOfCategory(4));
        store?.dispatch(reset());
        expect(store?.getState().product.products.length).toBe(2);
        expect(store?.getState().product.originalProducts.length).toBe(2);
    });
});
