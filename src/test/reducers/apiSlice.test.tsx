import fetchMock from "jest-fetch-mock";
import { API_URL, apiSlice } from "../../redux/api/apiSlice";
import categories from "../data/categoryData";
import products from "../data/productData";
import userData from "../data/userData";
import { setupApiStore } from "../shared/testUtils";

fetchMock.enableMocks();

beforeEach((): void => {
    fetchMock.resetMocks();
});

describe("getProducts", () => {
    test("request is correct", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(products));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.getProducts.initiate(undefined))
            .then(() => {
                expect(fetchMock).toBeCalledTimes(1);
                const { method, url } = fetchMock.mock.calls[0][0] as Request;
                expect(method).toBe("GET");
                expect(url).toBe(`${API_URL}products`);
            });
    });

    test("getProducts successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(products));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.getProducts.initiate(undefined))
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(products);
            });
    });
    test("getProduct successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(products[0]));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.getProduct.initiate(undefined))
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(products[0]);
            });
    });

    test("addNewProduct successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(products[0]));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.addNewProduct.initiate(undefined))
            .then((action: any) => {
                const { data } = action;
                expect(data).toStrictEqual(products[0]);
            });
    });

    test("deleteProduct successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(true));

        return storeRef.store
            .dispatch<any>(
                apiSlice.endpoints.deleteProduct.initiate(products[0].id),
            )
            .then((action: any) => {
                const { data } = action;
                expect(data).toStrictEqual(true);
            });
    });

    test("getUsers successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(userData));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.getUsers.initiate(undefined))
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(userData);
            });
    });
    test("getUser successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(userData[0]));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.getUser.initiate(undefined))
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(userData[0]);
            });
    });

    test("addNewCategory successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(categories[0]));

        return storeRef.store
            .dispatch<any>(
                apiSlice.endpoints.addNewCategory.initiate(undefined),
            )
            .then((action: any) => {
                const { data } = action;
                expect(data).toStrictEqual(categories[0]);
            });
    });

    test("getCategories successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(categories));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.getCategories.initiate(undefined))
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(categories);
            });
    });
    test("getCategory successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(categories[0]));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.getCategory.initiate(undefined))
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(categories[0]);
            });
    });

    test("editCategory successful response", () => {
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(categories[0]));

        return storeRef.store
            .dispatch<any>(
                apiSlice.endpoints.editCategory.initiate(categories[0].id),
            )
            .then((action: any) => {
                const { data } = action;
                expect(data).toStrictEqual(categories[0]);
            });
    });
    test("addLogin successful response", () => {
        const loginResponse = {
            access_token: "access_token",
            refresh_token: "refresh_token",
        };
        const storeRef = setupApiStore(apiSlice, {});
        fetchMock.mockResponse(JSON.stringify(loginResponse));

        return storeRef.store
            .dispatch<any>(apiSlice.endpoints.addLogin.initiate(undefined))
            .then((action: any) => {
                const { data } = action;
                expect(data).toStrictEqual(loginResponse);
            });
    });
});
