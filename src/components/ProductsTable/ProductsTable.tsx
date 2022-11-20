import { useAppSelector } from "../../hooks/redux";
import ProductCard from "../ProductCard/ProductCard";
import { Suspense, useCallback, useMemo } from "react";
import Loader from "../Loader/Loader";
import { SelectReturn } from "../../models/models";

function ProductsTable({
    page,
    select,
}: {
    page: number;
    select: SelectReturn;
}) {
    const { products, filteredProducts } = useAppSelector(
        (state) => state.products
    );

    const numberItem = useMemo(() => {
        return page === 0 ? page : page * +select.value;
    }, [page, select.value]);

    const showProducts = useCallback(() => {
        return (
            filteredProducts?.length ? [...filteredProducts] : [...products]
        )
            .sort((a, b) => a.price - b.price)
            .slice(numberItem, numberItem + +select.value);
    }, [filteredProducts, numberItem, products, select.value]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-5 min-h-[400px] gap-2 mb-2">
            <Suspense fallback={<Loader />}>
                {showProducts().map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </Suspense>
        </div>
    );
}
export default ProductsTable;
