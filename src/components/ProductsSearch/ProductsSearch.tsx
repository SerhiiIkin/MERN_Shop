import { useEffect, } from "react";
import { useDebounce } from "../../hooks/debounce";
import { useAppDispatch } from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import { productsSlice } from "../../store/slices/productSlice";

import style from "./ProductsSearch.module.css";

function ProductsSearch() {
    const input = useInput("");
    const debouncedSearchValue = useDebounce<string>(input.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productsSlice.actions.setInputSearchValue(debouncedSearchValue))
    }, [debouncedSearchValue, dispatch]);

    return (
        <input
            className={style.input}
            type="search"
            placeholder="Type title for search"
            value={input.value}
            onChange={input.onChange}
        />
    );
}
export default ProductsSearch;
