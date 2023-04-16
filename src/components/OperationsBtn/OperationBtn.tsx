import { BasketChange } from "../../models/models";
import {basketSlice} from "../../store/slices/basketSlice";
import { useAppDispatch  } from "../../hooks/redux";

import style from "./OperationBtn.module.scss"

function OperationBtn({
        title,
        quantity,
    }: {
        title: string;
        quantity: string;
    }) {
        const dispatch = useAppDispatch();
    
        function onClickChangeAmountItems(title: string, operation: string) {
            const item: BasketChange = {
                title,
                operation,
            };
            dispatch(basketSlice.actions.changeBasketItem(item));
        }

        return (
            <>
                <button
                    onClick={() => onClickChangeAmountItems(title, "-")}
                    className={style.btn}>
                    -
                </button>
                {quantity}
                <button
                    onClick={() => onClickChangeAmountItems(title, "+")}
                    className={style.btn}>
                    +
                </button>
            </>
        );
    }

export default OperationBtn