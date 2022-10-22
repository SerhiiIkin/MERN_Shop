import { ChangeEvent, useState } from "react";

interface InputReturn {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    clearInput : () => void
}

function useInput(): InputReturn {
    const [value, setValue] = useState("");

    function onChange(event: ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value);
    }

    function clearInput() {
        setValue("")
    }

    return { value, onChange, clearInput };
}

export default useInput;
