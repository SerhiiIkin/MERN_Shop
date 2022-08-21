import { ChangeEvent, useState } from "react";

interface InputReturn {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    clearinput : () => void
}

function useInput(): InputReturn {
    const [value, setValue] = useState("");

    function onChange(event: ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value);
    }

    function clearinput() {
        setValue("")
    }

    return { value, onChange, clearinput };
}

export default useInput;
