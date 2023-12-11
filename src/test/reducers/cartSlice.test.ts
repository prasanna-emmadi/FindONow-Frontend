import { addToCart, removeFromCart, resetCart } from "../../redux/cartSlice";
import createStore from "../../redux/store/store";
import { CategoryType, ProductType } from "../../types/productType";

describe("cart slice reducer", () => {
    const category: CategoryType = {
        _id: "1",
        id: 1,
        name: "category-name",
        image: "https://category-image.url.com",
    };
    const product: ProductType = {
        id: 1,
        title: "title",
        description: "description",
        category: category,
        price: 10,
        images: [],
    };

    let store: any;

    beforeEach(() => {
        store = createStore();
    });

    test("addToCart", () => {
        store?.dispatch(addToCart(product));
        expect(store?.getState().cart.cartItems.length).toBe(1);
        expect(store?.getState().cart.totalItems).toBe(1);
    });

    test("removeFromCart", () => {
        store?.dispatch(addToCart(product));
        store?.dispatch(addToCart(product));
        expect(store?.getState().cart.totalItems).toBe(2);
        store?.dispatch(removeFromCart(product.id));
        expect(store?.getState().cart.cartItems.length).toBe(1);
        expect(store?.getState().cart.totalItems).toBe(1);
    });

    test("resetCart", () => {
        store?.dispatch(addToCart(product));
        store?.dispatch(resetCart());
        expect(store?.getState().cart.cartItems.length).toBe(0);
        expect(store?.getState().cart.totalItems).toBe(0);
    });
});
