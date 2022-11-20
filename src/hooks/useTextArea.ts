import { ChangeEvent, useState } from "react";

function useTextArea(defaultValue:string) {

    const [textAreaValue, setTextAreaValue] = useState(defaultValue);

    function onChangeTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
        setTextAreaValue(event.target.value);
    }

    function changeValue(value:string) {
        setTextAreaValue(value)
    }

    function clearTextAreaValue() {
        setTextAreaValue("")
    }

    return {textAreaValue, onChangeTextarea, clearTextAreaValue, changeValue};
}
export default useTextArea;
