import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectReturn } from "../models/models";

function useSelect(): SelectReturn {
    const [value, setValue] = useState("5");
    const navigate = useNavigate();

    function onChange(event: ChangeEvent<HTMLSelectElement>): void {
        setValue(event.target.value);
        navigate("/");
    }

    return { value, onChange };
}

export default useSelect;
