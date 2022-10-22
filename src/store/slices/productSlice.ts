import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, ProductsState } from "../../models/models";



const initialState: ProductsState = {
    loading: false,
    error: "",
    products: [],
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
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        },
        addProduct(state, action: PayloadAction<IProducts>) {
           state.products.push(action.payload)
       },
        setInputSearchValue(state, action: PayloadAction<string>) {
            state.inputSearchValue = action.payload;
            // eslint-disable-next-line
            state.filteredProducts = state.products.filter((product) => {
                if (
                    +state.minValue < +product.price &&
                    +product.price < +state.maxValue
                ) {
                    return product.title
                        .toLowerCase()
                        .includes(state.inputSearchValue.toLowerCase());
                }
            });
        },
        setMinValue(state, action: PayloadAction<string>) {
            state.minValue = action.payload;
            // eslint-disable-next-line
            state.filteredProducts = state.products.filter((product) => {
                if (
                    +state.minValue < +product.price &&
                    +product.price < +state.maxValue
                ) {
                    return product.title
                        .toLowerCase()
                        .includes(state.inputSearchValue.toLowerCase());
                }
            });
        },
        setMaxValue(state, action: PayloadAction<string>) {
            state.maxValue = action.payload;
            // eslint-disable-next-line
            state.filteredProducts = state.products.filter((product) => {
                if (
                    +state.minValue < +product.price &&
                    +product.price < +state.maxValue
                ) {
                    return product.title
                        .toLowerCase()
                        .includes(state.inputSearchValue.toLowerCase());
                }
            });
        },
    },
});

export default productsSlice.reducer;
