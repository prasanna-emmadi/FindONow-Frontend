import fetchMock from "jest-fetch-mock";
import { apiSlice } from "../../redux/api/apiSlice";
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
                const { method } = fetchMock.mock.calls[0][0] as Request;
                expect(method).toBe("GET");
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
});
