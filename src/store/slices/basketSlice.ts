import { BasketChange, BasketItem } from "./../../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketState } from "../../models/models";

const initialState: BasketState = {
    basket: [],
    sum: 0,
};

export const basketSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addToBasket(state, action: PayloadAction<BasketItem>) {
            state.basket.push(action.payload);
            state.basket.map((item) => {
                if (item.title === action.payload.title) {
                    state.sum += +(+item.price * +item.quantity).toFixed(2);
                }

                return item;
            });
        },
        changeBasketItem(state, action: PayloadAction<BasketChange>) {
            switch (action.payload.operation) {
                case "+":
                    state.basket = state.basket.map((item) => {
                        if (item.title === action.payload.title) {
                            state.sum = +(state.sum + +item.price).toFixed(2);
                            item.quantity = String(+item.quantity + 1);
                        }
                        return item;
                    });
                    break;
                case "-":
                    state.basket = state.basket.map((item) => {
                        if (item.title === action.payload.title) {
                            state.sum = +(state.sum - +item.price).toFixed(2);
                            item.quantity = String(+item.quantity - 1);
                        }
                        return item;
                    });
                    state.basket = state.basket.filter(
                        (item) => item.quantity !== "0"
                    );
                    break;

                default:
                    break;
            }
        },
        logout(state) {
            state.basket = [];
        },
    },
});

export default basketSlice.reducer;
