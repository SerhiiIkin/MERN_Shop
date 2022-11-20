import { useEffect } from "react";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import ProductsBody from "../../components/ProductsBody/ProductsBody";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "../../store/actions/productsActions";

import style from "./ProductsPage.module.css";

function ProductsPage() {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (error) return <ErrorMessage style={style.error} error={error} />;
    if (loading) return <Loader />;

    return <ProductsBody />;
}

export default ProductsPage;
