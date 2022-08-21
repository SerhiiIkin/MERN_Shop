import { useEffect } from "react";
import { useDebounce } from "../../hooks/debounce";
import { useAppDispatch } from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import { setInputValueSearch } from "../../store/actions/productsActions";
import style from "./ProductsSearch.module.css";

function ProductsSearch() {
    const input = useInput();
    const debouncedSearch = useDebounce<string>(input.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setInputValueSearch(debouncedSearch));
    }, [debouncedSearch,dispatch]);

    return (
        <input
            className={style.input}
            type="search"
            placeholder="Type title for search"
            {...input}
        />
    );
}
export default ProductsSearch;
