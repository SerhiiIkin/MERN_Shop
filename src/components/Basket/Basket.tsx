import classNames from "classnames";
import { useState, useCallback, MouseEvent } from "react";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasketChange } from "../../models/models";
import { basketSlice } from "../../store/slices/basketSlice";

import style from "./Basket.module.css";

function Basket() {
    const { basket, sum } = useAppSelector((state) => state.basket);

    const [active, setActive] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mouseBasket = useCallback((event: MouseEvent | any) => {
        const type = event.type;

        if (type === "click") {
            if (active) setActive(false);
            if (!active) setActive(true);
        }
        if (type === "mouseenter") setActive(true);
        if (type === "mouseleave") setActive(false);
    }, [active]);

    function onClickChangeAmountItems(title: string, operation: string) {
        const item: BasketChange = {
            title,
            operation,
        };
        dispatch(basketSlice.actions.changeBasketItem(item));
    }

    return (
        <span className={style.basketContainer}>
            <SlBasket onClick={mouseBasket} onMouseEnter={mouseBasket} />
            <div
                onMouseLeave={mouseBasket}
                className={classNames(
                    style.basketBody,
                    active && style.basketOpen
                )}>
                {basket.length <= 0 && <p>Basket is empty!</p>}

                <table>
                    {basket.length > 0 && (
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td></td>
                                <td>Price per one</td>
                            </tr>
                        </thead>
                    )}
                    {basket.map((item) => {
                        const { price, title, quantity } = item;

                        const notLongTitle = title.substr(0, 20) + "...";

                        return (
                            <tbody key={price}>
                                <tr className={style.bodyList}>
                                    <td>{notLongTitle}</td>
                                    <td className={style.btnContainer}>
                                        <button
                                            onClick={() =>
                                                onClickChangeAmountItems(
                                                    title,
                                                    "+"
                                                )
                                            }
                                            className={style.btn}>
                                            +
                                        </button>
                                        {quantity}
                                        <button
                                            onClick={() =>
                                                onClickChangeAmountItems(
                                                    title,
                                                    "-"
                                                )
                                            }
                                            className={style.btn}>
                                            -
                                        </button>
                                    </td>
                                    <td> {price} $</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>

                {basket.length > 0 && (
                    <>
                        <p>Full price: {sum} </p>
                        <button
                            onClick={() => {
                                navigate("basket");
                                setActive(false);
                            }}
                            className={style.btn}>
                            Go to buy
                        </button>
                    </>
                )}
            </div>
        </span>
    );
}

export default Basket;
