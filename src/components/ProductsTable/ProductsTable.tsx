import { useAppSelector } from "../../hooks/redux";
import ProductCard from "../ProductCard/ProductCard";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import { SelectReturn } from "../../models/models";

function ProductsTable({ page, select }: { page: number, select: SelectReturn }) {
    const { products, filteredProducts } = useAppSelector(
        (state) => state.products
    );
    const numberItem = page === 0 ? page : page * +select.value;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={<Loader />}>
                {(filteredProducts?.length
                    ? [...filteredProducts]
                    : [...products]
                )
                    .sort((a, b) => a.price - b.price)
                    .slice(numberItem, numberItem + +select.value)
                    .map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
            </Suspense>
        </div>
    );
}
export default ProductsTable;
