import { FormEvent, useMemo, useState } from "react";
import useInput from "../../hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { basketSlice } from "../../store/slices/basketSlice";
import { IProducts } from "../../models/models";

import style from "./AmountForm.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";

function AmountForm({
    product,
    postId,
}: {
    product: IProducts;
    postId: string;
}) {
    const { basket } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();

    const foundedItem = useMemo(() => {
        return basket.find((item) => item.title === product.title);
    }, [basket, product.title]);

    const [isNotCorrectData, setIsNotCorrectData] = useState(false);
    const amountInput = useInput("1");

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
            <li className="flex flex-col justify-center">
                <span> Product was added!</span>
                {postId && (
                    <p className="my-2">
                        <Link
                            className="p-2 rounded bg-orange-400 xl:hover:bg-blue-500"
                            to={"/"}>
                            Go shop more
                        </Link>
                    </p>
                )}
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
                    className={classNames(
                        style.inputAmountProducts,
                        isNotCorrectData &&
                            "placeholder:text-red-300 border-red-400"
                    )}
                />
            </label>
            <span>
                <button type="submit" className={style.btnAddToBasket}>
                    Add
                </button>
            </span>
        </form>
    );
}

export default AmountForm;
