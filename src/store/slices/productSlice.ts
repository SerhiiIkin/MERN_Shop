import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, ProductsState } from "../../models/models";

const initialState: ProductsState = {
    loading: false,
    error: "",
    products: [],
    product: {
        title: "",
        price: 0,
        description: "",
        category: "",
    },
    inputSearchValue: "",
    minValue: "0",
    maxValue: "",
    filteredProducts: [],
};

export const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true;
        },
        fetchSuccess(state, action: PayloadAction<IProducts[]>) {
            state.loading = false;
            state.products = action.payload;
        },
        fetchOneSuccess(state, action: PayloadAction<IProducts>) {
            state.loading = false;
            state.product = action.payload;
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        },
        addProduct(state, action: PayloadAction<IProducts>) {
            state.products.push(action.payload);
        },
        removeProduct(state, action: PayloadAction) {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },

        setInputSearchValue(state, action: PayloadAction<string>) {
            state.inputSearchValue = action.payload;
            state.filteredProducts = state.products.filter((product) => {
                return (
                    +state.minValue < +product.price &&
                    +product.price < +state.maxValue &&
                    product.title
                        .toLowerCase()
                        .includes(state.inputSearchValue.toLowerCase())
                );
            });
        },

        setMinValue(state, action: PayloadAction<string>) {
            state.minValue = action.payload;
            state.filteredProducts = state.products.filter((product) => {
                return (
                    +state.minValue < +product.price &&
                    +product.price < +state.maxValue &&
                    product.title
                        .toLowerCase()
                        .includes(state.inputSearchValue.toLowerCase())
                );
            });
        },
        setMaxValue(state, action: PayloadAction<string>) {
            state.maxValue = action.payload;
            state.filteredProducts = state.products.filter((product) => {
                return (
                    +state.minValue < +product.price &&
                    +product.price < +state.maxValue &&
                    product.title
                        .toLowerCase()
                        .includes(state.inputSearchValue.toLowerCase())
                );
            });
        },
    },
});

export default productsSlice.reducer;
