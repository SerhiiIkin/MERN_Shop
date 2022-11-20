import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import MultiRangeSlider from "../MultiRange/MultiRangeSlider";
import ReactPaginate from "react-paginate";
import ProductsSearch from "../ProductsSearch/ProductsSearch";
import ProductsTable from "../ProductsTable/ProductsTable";
import NotFoundedProducts from "../NotFoundedProducts";
import SelectPerPage from "../SelectPerPage/SelectPerPage";
import useSelect from "../../hooks/useSelect";

import style from "./ProductsBody.module.css";

function ProductsBody() {
    const { products, filteredProducts } = useAppSelector(
        (state) => state.products
    );
    const params = useParams();
    const navigate = useNavigate();
    const select = useSelect();

    const idPage = useMemo(() => {
        return params.id ? +params?.id - 1 : 0;
    }, [params.id]);
    const lengthProducts = useMemo(() => {
        return filteredProducts?.length
            ? filteredProducts.length
            : products.length;
    }, [filteredProducts.length, products.length]);

    const [page, setPage] = useState(idPage);

    const pageCount = Math.ceil(lengthProducts / +select.value);
    const currentPage = Math.min(pageCount, Math.max(page + 1, 1)) - 1;

    const pageChangeHandler = ({ selected }: { selected: number }) => {
        setPage(selected);
    };

    useEffect(() => {
        setPage(idPage);
    }, [filteredProducts.length, idPage]);

    const ProductsJSX = useCallback(() => {
        function onNavigateBtnClick(event: any): void {
            const nextSelectedPage = event.nextSelectedPage;
            const page = nextSelectedPage ? nextSelectedPage + 1 : 1;

            if (
                event.event.target.ariaDisabled !== "true" &&
                nextSelectedPage + 1 === page
            ) {
                navigate(`/page=${page}`);
            }
        }

        if (!filteredProducts?.length) return <NotFoundedProducts />;

        return (
            <>
                <ProductsTable select={select} page={page} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    containerClassName={style.containerPagination}
                    pageClassName={style.btn}
                    nextLinkClassName={style.link}
                    previousLinkClassName={style.link}
                    pageLinkClassName={style.link}
                    previousClassName={style.btn}
                    nextClassName={style.btn}
                    activeClassName={style.activeBtn}
                    onPageChange={pageChangeHandler}
                    breakClassName={"mr-2"}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<"
                    onClick={onNavigateBtnClick}
                    forcePage={currentPage}
                    disabledLinkClassName={style.disLink}
                    disabledClassName={style.disBtn}
                />
            </>
        );
    }, [
        currentPage,
        filteredProducts?.length,
        navigate,
        page,
        pageCount,
        select,
    ]);

    return (
        <>
            <ProductsSearch />
            <MultiRangeSlider />
            <SelectPerPage select={select} />
            <ProductsJSX />
        </>
    );
}
export default ProductsBody;
