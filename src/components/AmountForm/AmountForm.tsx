import { FormEvent, useMemo, useState } from "react";
import useInput from "../../hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { basketSlice } from "../../store/slices/basketSlice";

import style from "./AmountForm.module.css";
import { Link } from "react-router-dom";

function AmountForm() {
    const { product } = useAppSelector((state) => state.products);
    const { basket } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();

    const foundedItem = useMemo(() => {
        return basket.find((item) => item.title === product.title);
    }, [basket, product.title]);

    const [isNotCorrectData, setIsNotCorrectData] = useState(false);
    const amountInput = useInput("");

    function submitHandlerAmountProduct(e: FormEvent) {
        e.preventDefault();

        const basketData = {
            title: product.title,
            quantity: amountInput.value,
            price: String(product.price),
        };

        function checkData() {
            return (
                !isNaN(+amountInput.value) && amountInput.value.trim().length
            );
        }

        if (checkData()) {
            dispatch(basketSlice.actions.addToBasket(basketData));
            amountInput.clearInput();
            setIsNotCorrectData(false);
        } else {
            setIsNotCorrectData(true);
        }
    }

    if (foundedItem)
        return (
            <li className="mb-4 flex flex-col items-center">
                Product was add to basket!
                <p className="mt-2">
                    <Link
                        className="p-2 rounded bg-orange-400 xl:hover:bg-blue-500"
                        to={"/"}>
                        Go shop more
                    </Link>
                </p>
            </li>
        );

    return (
        <form
            className={style.formAmountProduct}
            onSubmit={submitHandlerAmountProduct}>
            <label htmlFor="amount" className={style.labelAmountProducts}>
                <input
                    type="text"
                    id="amount"
                    value={amountInput.value}
                    onChange={amountInput.onChange}
                    placeholder="Amount of product"
                    className={style.inputAmountProducts}
                />
                {isNotCorrectData && (
                    <span className={style.spanAmountProducts}>
                        You can enter only numbers
                    </span>
                )}
            </label>
            <span>
                <button type="submit" className={style.btnAddToBasket}>
                    Add to basket
                </button>
            </span>
        </form>
    );
}

export default AmountForm;
