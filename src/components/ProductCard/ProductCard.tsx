import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { IProducts } from "../../models/models";
import Loader from "../Loader/Loader";
import style from "./ProductCard.module.css";



function ProductCard({ product }: {product: IProducts;}) {
    const ImageCard = lazy(() => import("../ImageCard"));
    
    return (
        <div className={style.box}>
            <p className="pb-2">
                <strong>Title: </strong>
                {product.title}
            </p>
            <p className="pb-2">
                <strong>Price: </strong>
                {product.price} $
            </p>
            <Suspense fallback={<Loader />}>
                <ImageCard imgCard={style.imgCard}  picLink={product?.image} />
            </Suspense>
            <p className="pt-2">
                <Link className={style.link} to={`/product/${product._id}`}>
                    More
                </Link>
            </p>
        </div>
    );
}
export default ProductCard;
