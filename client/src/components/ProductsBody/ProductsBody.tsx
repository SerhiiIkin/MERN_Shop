import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import MultiRangeSlider from "../MultiRange/MultiRangeSlider";
import Paginate from "../Paginate/Paginate";
import ProductsSearch from "../ProductsSearch/ProductsSearch";
import ProductsTable from "../ProductsTable/ProductsTable";
import NotFoundedProducts from "../NotFoundedProducts";

function ProductsBody() {
    const params = useParams();
    const idPage = params.id ? +params?.id - 1 : 0;
    const [page, setPage] = useState(idPage);

    const { products, filteredProducts } = useAppSelector(
        (state) => state.products
    );
    const lengthProducts = filteredProducts?.length
        ? filteredProducts.length
        : products.length;

    const pageChangeHandler = ({ selected }: { selected: number }) => {
        setPage(selected);
    };

    useEffect(() => {
        setPage(0);
    }, [filteredProducts.length]);

    return (
        <>
            <ProductsSearch />
            <MultiRangeSlider />
            {filteredProducts.length ? (
                <>
                    <ProductsTable page={page} />
                    <Paginate
                        page={page}
                        lengthProducts={lengthProducts}
                        pageChangeHandler={pageChangeHandler}
                    />
                </>
            ) : (
                <NotFoundedProducts />
            )}
        </>
    );
}
export default ProductsBody;
