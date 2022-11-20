import { ChangeEvent } from "react";

export interface IProducts {
    _id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image?: string;
}

export interface ProductsState {
    loading: boolean;
    error: string;
    products: IProducts[];
    product: IProducts;
    filteredProducts: IProducts[];
    inputSearchValue: string;
    minValue: string;
    maxValue: string;
}

export interface AuthState {
    error: string;
    token: string;
    isAuth: boolean;
    username: string;
}

export interface AuthPayload {
    username: string;
    token: string;
    role: string;
}

export interface AuthPayloadRegister {
    message: string;
}

export interface IComments {
    postId: string;
    _id?: string;
    username: string;
    body: string;
    date: string;
}

export interface SelectReturn {
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface AuthData {
    username: string;
    password: string;
}

export type BasketState = {
    basket: BasketItem[];
    sum:number
};

export type BasketItem = {
    title: string;
    quantity: string;
    price: string;
};

export type BasketChange = {
    title: string;
    operation: string;
};
