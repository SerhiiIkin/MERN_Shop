import { ChangeEvent, useState } from "react";
import { SelectReturn } from "../models/models";



function useSelect(): SelectReturn {
    const [value, setValue] = useState("3");

    function onChange(event: ChangeEvent<HTMLSelectElement>): void {
        setValue(event.target.value);
    }

   

    return { value, onChange };
}

export default useSelect;
