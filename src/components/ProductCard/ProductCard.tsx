import { lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { IProducts } from "../../models/models";
import AmountForm from "../AmountForm/AmountForm";
import Loader from "../Loader/Loader";

import style from "./ProductCard.module.scss";

function ProductCard({ product }: { product: IProducts }) {
    const ImageCard = lazy(() => import("../ImageCard"));
    const { role } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <div className={style.box}>
            <Suspense fallback={<Loader />}>
                <ImageCard styles="max-w-[250px] max-h-[250px]" picLink={product.image} />
            </Suspense>
            <p className="pb-2">{product.title}</p>
            <p className="pb-2 mb-auto">{product.price} $</p>

            <div className={style.body}>
                <Link className={style.link} to={`/product/${product._id}`}>
                    More
                </Link>
                {role ? (
                    <AmountForm postId="" product={product} />
                ) : (
                    <button
                        onClick={() => navigate("/authorization")}
                        title="Log in for add product"
                        className={style.btn}>
                        Add product!
                    </button>
                )}
            </div>
        </div>
    );
}
export default ProductCard;
