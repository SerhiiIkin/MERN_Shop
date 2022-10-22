import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { IProducts } from "../../models/models";
import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/Loader";
import style from "./ProductDetailPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import CommentsList from "../../components/CommentsList/CommentsList";
import { fetchComments } from "../../store/actions/commentsActions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function ProductDetailPage() {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector((state) => state.auth);
    const param = useParams<"id">();
    const [product, setProduct] = useState<IProducts>();
    const [error, setError] = useState(false);

    const ImageCard = lazy(() => import("../../components/ImageCard"));
    

    async function fetchProduct() {
        try {
            const response = await axios.get<IProducts>(
                `api/product/${param.id}`
            );

            setProduct(response.data);
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchProduct();
        dispatch(fetchComments());
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {!error ? (
                <ul className={style.productBox}>
                    <li>
                        <strong> Product title: </strong> {product?.title}
                    </li>
                    <li>
                        <Suspense fallback={<Loader />}>
                            <ImageCard
                                imgCard={"w-72"}
                                picLink={product?.image}
                            />
                        </Suspense>
                    </li>
                    <li>
                        <strong>Product description: </strong>
                        {product?.description}
                    </li>
                    <li>
                        <strong>Product price: </strong> {product?.price}
                    </li>

                    <CommentsList />
                    {isAuth && <CommentsForm />}
                </ul>
            ) : (
                <ErrorMessage
                    style={style.error}
                    error="Cant get data from server!"
                />
            )}
        </>
    );
}

export default ProductDetailPage;
