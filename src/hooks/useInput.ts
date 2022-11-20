import { ChangeEvent, useState } from "react";

interface InputReturn {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    clearInput: () => void;
    changeValue: (value:string) => void;
}

function useInput(defaultValue: string): InputReturn {
    const [value, setValue] = useState(defaultValue);

    function onChange(event: ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value);
    }

    function changeValue(value:string) {
        setValue(value)
    }

    function clearInput() {
        setValue("");
    }

    return { value, onChange, clearInput, changeValue };
}

export default useInput;
