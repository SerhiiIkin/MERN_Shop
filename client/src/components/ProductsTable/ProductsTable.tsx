import { useAppSelector } from "../../hooks/redux";
import { ITEMS_PER_PAGE } from "../../pages/ProductsPage/ProductsPage";
import ProductCard from "../ProductCard/ProductCard";

function ProductsTable({ page }: { page: number }) {
    const { products, filteredProducts } = useAppSelector(
        (state) => state.products
    );
    const numberItem = page === 0 ? page : page * ITEMS_PER_PAGE;

    return (
        <div className="flex flex-wrap min-h-[450px]">
            {(filteredProducts?.length ? [...filteredProducts] : [...products])
                .sort((a, b) => a.price - b.price)
                .slice(numberItem, numberItem + ITEMS_PER_PAGE)
                .map((product) => <ProductCard product={product} key={product._id} />)}
        </div>
    );
}
export default ProductsTable;
