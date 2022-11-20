import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import Loader from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import CommentsList from "../../components/CommentsList/CommentsList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import EditProduct from "../../components/EditProduct/EditProduct";
import AmountForm from "../../components/AmountForm/AmountForm";

import style from "./ProductDetailPage.module.css";

import { fetchComments } from "../../store/actions/commentsActions";
import {
    fetchProduct,
    deleteProduct,
} from "../../store/actions/productsActions";

function ProductDetailPage() {
    const dispatch = useAppDispatch();
    const { isAuth, role } = useAppSelector((state) => state.auth);
    const { product, error, loading } = useAppSelector(
        (state) => state.products
    );
    const { id } = useParams<"id">();
    const postId = String(id);
    const navigate = useNavigate();
    const ImageCard = lazy(() => import("../../components/ImageCard"));

    const [isDialog, setIsDialog] = useState(false);

    function removeProduct() {
        dispatch(deleteProduct(postId));
        if (!error) {
            setTimeout(() => {
                navigate("/");
            }, 5000);
        }
    }

    function onEditProductBtnClick() {
        setIsDialog(true);
    }

    useEffect(() => {
        dispatch(fetchProduct(postId));
        dispatch(fetchComments(postId));
    }, [postId, dispatch]);

    if (error) return <ErrorMessage style={style.error} error={error} />;
    if (loading) return <Loader />;

    return (
        <>
            {isDialog && (
                <EditProduct isOpen={isDialog} setIsDialog={setIsDialog} />
            )}
            {role === "ADMIN" && (
                <div className="flex justify-self-end">
                    <FaEdit
                        onClick={onEditProductBtnClick}
                        color="blue"
                        className="mr-2 cursor-pointer"
                    />
                    <FaTrash
                        className="cursor-pointer"
                        onClick={removeProduct}
                        color="red"
                    />
                </div>
            )}
            <ul className={style.wrapper}>
                <li>
                    <strong> Product title: </strong> {product?.title}
                </li>
                <li>
                    <Suspense fallback={<Loader />}>
                        <ImageCard
                            styles={"mx-auto w-[40vw] aspect-square"}
                            picLink={product?.image}
                        />
                    </Suspense>
                </li>
                <li>
                    <strong>Product description: </strong>
                    {product?.description}
                </li>
                <li>
                    <strong>Product category: </strong> {product?.category}
                </li>
                <li>
                    <strong>Product price: </strong> {product?.price}
                </li>
                {role && <AmountForm />}
            </ul>
            <ul className={style.wrapper}>
                <CommentsList />
                {isAuth && <CommentsForm />}
            </ul>
        </>
    );
}

export default ProductDetailPage;
