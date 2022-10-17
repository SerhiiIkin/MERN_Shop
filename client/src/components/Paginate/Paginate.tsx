import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../pages/ProductsPage/ProductsPage";
import style from "./Pagination.module.css";

interface PropsPaginate {
    lengthProducts: number;
    page: number;
    pageChangeHandler: ({ selected }: { selected: number }) => void;
}

function Paginate({ pageChangeHandler, page, lengthProducts }: PropsPaginate) {
    const navigate = useNavigate();
    const pageCount = Math.ceil(lengthProducts / ITEMS_PER_PAGE);
    const currentPage = Math.min(pageCount, Math.max(page + 1, 1)) - 1;

    function onNavigateBtnClick(event: any) {
        const page = event.nextSelectedPage ? event.nextSelectedPage + 1 : 1;

        navigate(`/page=${page}`);
    }

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            containerClassName="flex mb-2"
            pageClassName={style.btn}
            nextLinkClassName={style.link}
            previousLinkClassName={style.link}
            pageLinkClassName={style.link}
            previousClassName={style.btn}
            nextClassName={style.btn}
            activeClassName="bg-blue-400"
            onPageChange={pageChangeHandler}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            onClick={onNavigateBtnClick}
            forcePage={currentPage}
            disabledLinkClassName="sm:hover:cursor-not-allowed"
            disabledClassName={style.disBtn}
        />
    );
}
export default Paginate;
