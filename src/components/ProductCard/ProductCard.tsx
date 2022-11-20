import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { IProducts } from "../../models/models";
import Loader from "../Loader/Loader";

import style from "./ProductCard.module.css";

function ProductCard({ product }: { product: IProducts }) {
    const ImageCard = lazy(() => import("../ImageCard"));

    return (
        <Link className={style.box} to={`/product/${product._id}`}>
            <Suspense fallback={<Loader />}>
                <ImageCard styles={style.imgCard} picLink={product.image} />
            </Suspense>
            <p className="pb-2">{product.title}</p>
            <p className="pb-2 mb-auto">{product.price} $</p>
        </Link>
    );
}
export default ProductCard;
