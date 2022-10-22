import { ChangeEvent, MouseEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { IComments } from "../../models/models";
import style from "./CommentsForm.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addComment } from "../../store/actions/commentsActions";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "../../axios";

function CommentsForm() {
    const [textareaValue, setTextareaValue] = useState("");
    const param = useParams<"id">();
    const postId = param?.id ? param?.id : "";
    const dispatch = useAppDispatch();
    const { username } = useAppSelector((state) => state.auth);
    const [isError, setIsError] = useState(false);

    async function onBtnSendClick(event: MouseEvent<HTMLButtonElement>) {
        if (isFormValid()) {
            addNewComment();
            setIsError(false);
        } else {
            setIsError(true);
        }
    }

    function onTextareaChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        const value = event.target.value;
        value.trim().length && setIsError(false);
        setTextareaValue(value);
    }

    function isFormValid() {
        return textareaValue.trim().length;
    }

    async function addNewComment() {
        setIsError(false);
        const newComment: IComments = {
            postId,
            username,
            date: new Date().toLocaleString(),
            body: textareaValue,
        };

        const response = await axios.post("api/comment", newComment);

        dispatch(addComment(response.data));
        setTextareaValue("");
    }

    function onEnterCtrlDown(event: any) {
        if (event.code === "Enter" && event.ctrlKey) {
            isFormValid() ? addNewComment() : setIsError(true);
        }
    }

    return (
        <li className={style.commentContainer}>
            <label htmlFor="commentText">Write you feedback</label>
            <textarea
                onChange={onTextareaChange}
                spellCheck
                onKeyDown={onEnterCtrlDown}
                className="p-2 block"
                id="commentText"
                name="commentText"
                value={textareaValue}
                placeholder={"for send text press ctrl + enter"}></textarea>
            <button
                onClick={onBtnSendClick}
                disabled={isError}
                className={style.btnSend}>
                Send
            </button>
            {isError ? (
                <ErrorMessage
                    style={style.error}
                    error={"Can't add comment!"}
                />
            ) : (
                ""
            )}
        </li>
    );
}
export default CommentsForm;
