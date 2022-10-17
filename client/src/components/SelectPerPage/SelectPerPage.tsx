import { SelectReturn } from "../../models/models";

function SelectPerPage({ select }: { select: SelectReturn }) {
    return (
        <div className="mt-8 mb-2">
            <label htmlFor="select">Select number items per page:</label>
            <select
                id="select"
                className="p-1 rounded focus:border-0"
                {...select}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
            </select>
        </div>
    );
}

export default SelectPerPage;
