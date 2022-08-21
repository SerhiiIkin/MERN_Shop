import { AppDispatch } from "..";
import axios from "../../axios";
import { IProducts } from "../../models/models";
import { productsSlice } from "../slices/productSlice";

export function fetchProducts() {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productsSlice.actions.fetching());
            const response = await axios.get<IProducts[]>("products");
            dispatch(productsSlice.actions.fetchSuccess(response.data));
        } catch (e) {
            dispatch(productsSlice.actions.fetchError(e as Error));
        }
    };
}

export function setInputValueSearch(value: string) {
    return (dispatch: AppDispatch) => {
        dispatch(productsSlice.actions.setInputSearchValue(value));
    };
}

export function setMinValueRange(value: string) {
    return (dispatch: AppDispatch) => {
        dispatch(productsSlice.actions.setMinValue(value));
    };
}

export function setMaxValueRange(value: string) {
    return (dispatch: AppDispatch) => {
        dispatch(productsSlice.actions.setMaxValue(value));
    };
}

export function addProduct(product: IProducts) {
    return (dispatch:AppDispatch) => {
        dispatch(productsSlice.actions.addProduct(product));
    };
}