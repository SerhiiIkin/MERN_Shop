import classNames from "classnames";
import { useCallback, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import {  useAppSelector } from "../../hooks/redux";

import style from "./Basket.module.scss";
import OperationBtn from "../OperationsBtn/OperationBtn";

function Basket() {
    const { basket, sum } = useAppSelector((state) => state.basket);

    const [active, setActive] = useState(false);

    const navigate = useNavigate();

    const onBasketClick = useCallback(() => {
        active ? setActive(false) : setActive(true);
    }, [active]);

    return (
        <span className={style.basketContainer}>
            <SlBasket title="press to hold" onClick={onBasketClick} />
            <div
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
                                        <OperationBtn
                                            title={title}
                                            quantity={quantity}
                                        />
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
                            className={style.btn}
                            onClick={() => {
                                navigate("basket");
                                setActive(false);
                            }}
                            >
                            Go to buy
                        </button>
                    </>
                )}
            </div>
        </span>
    );
}

export default Basket;
