import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import ProductsBody from "../../components/ProductsBody/ProductsBody";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "../../store/actions/productsActions";
import style from "./ProductsPage.module.css";

export const ITEMS_PER_PAGE = 3;

function ProductsPage() {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            {error && <ErrorMessage style={style.error} error={error} />}
            {loading && <Loader />}
            {!error && !loading && (
                <ProductsBody  />
            )}
        </>
    );
}

export default ProductsPage;
