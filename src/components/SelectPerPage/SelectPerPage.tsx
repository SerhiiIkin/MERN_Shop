import { SelectReturn } from "../../models/models";

function SelectPerPage({ select }: { select: SelectReturn }) {
    return (
        <div className="mt-8 mb-2">
            <label htmlFor="select">Select number items per page:</label>
            <select
                id="select"
                className="p-1 rounded focus:border-0 focus:outline-none"
                {...select}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </div>
    );
}

export default SelectPerPage;
