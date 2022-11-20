// eslint-disable-next-line
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "..";
import axios from "../../axios";
import { IProducts } from "../../models/models";
import { productsSlice } from "../slices/productSlice";

export function fetchProducts() {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productsSlice.actions.fetching());
            const { data } = await axios.get<IProducts[]>("api/products");
            dispatch(productsSlice.actions.fetchSuccess(data));
        } catch (error: AxiosError | any) {
            dispatch(
                productsSlice.actions.fetchError(error.response.data.messsage)
            );
        }
    };
}

export function fetchProduct(id: string) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productsSlice.actions.fetching());
            const { data } = await axios.get<IProducts>(`api/product/${id}`);
            dispatch(productsSlice.actions.fetchOneSuccess(data));
        } catch (error: AxiosError | any) {
            dispatch(
                productsSlice.actions.fetchError(error.response.data.messsage)
            );
        }
    };
}

export function addProduct(product: FormData) {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await axios.post("api/product", product);
            dispatch(productsSlice.actions.fetchOneSuccess(data.product));
            toast(data.message);
        } catch (error) {
            toast("Cant add product!");
        }
    };
}

export function changeProduct(updatedProduct: FormData) {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await axios.put("api/product", updatedProduct);
            dispatch(productsSlice.actions.fetchOneSuccess(data.product));
            toast(data.message);
        } catch (error) {
            toast("Cant updated product!");
        }
    };
}

export function deleteProduct(postId: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await axios.delete(`api/product/${postId}`);
            toast(data.message);
        } catch (error: AxiosError | any) {
            toast(error.response.data.message);
            console.log(error.response.data.message);
        }
    };
}
