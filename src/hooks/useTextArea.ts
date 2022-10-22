import { ChangeEvent, useState } from "react";

function useTextArea() {

    const [textAreaValue, setTextAreaValue] = useState("");

    function onChangeTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
        setTextAreaValue(event.target.value);
    }

    function clearTextAreaValue() {
        setTextAreaValue("")
    }

    return {textAreaValue, onChangeTextarea, clearTextAreaValue};
}
export default useTextArea;
