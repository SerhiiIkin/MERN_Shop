import DataForm from "../../components/DataForm/DataForm";
import OperationBtn from "../../components/OperationsBtn/OperationBtn";
import { useAppSelector } from "../../hooks/redux";

import style from "./BasketPage.module.scss";

function BasketPage() {
    const { basket, sum } = useAppSelector((state) => state.basket);

    if (!basket.length) return <p>Basket is Empty</p>;

    return (
        <section>
            <table className={style.table}>
                <tbody>
                    {basket.map((item) => {
                        const { title, price, quantity } = item;
                        return (
                            <tr key={title}>
                                <td className="p-1"> {title} </td>
                                <td className="p-1"> {price} $</td>
                                <td className="p-1">
                                    <OperationBtn
                                        title={title}
                                        quantity={quantity}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="mb-4">Full price</td>
                        <td></td>
                        <td>{sum.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <article>
                <DataForm />
            </article>
        </section>
    );
}

export default BasketPage;
