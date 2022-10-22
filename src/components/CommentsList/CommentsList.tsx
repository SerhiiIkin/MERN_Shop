import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { filterComments } from "../../store/actions/commentsActions";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import style from "./CommentsList.module.css";

function CommentsList() {
    const dispatch = useAppDispatch();
    const { comments, filteredComments, loading, error } = useAppSelector(
        (state) => state.comments
    );
    const param = useParams<"id">();
    const postId = param?.id ? param?.id : "";

    useEffect(() => {
        const filteredComments = comments.filter((el) => el.postId === postId);
        dispatch(filterComments(filteredComments));
    }, [dispatch, comments, postId]);

    return (
        <>
            {loading && <Loader />}
            {error && (
                <ErrorMessage
                    style={style.error}
                    error={"Cant get comments!"}
                />
            )}
            {filteredComments?.map((comment) => {
                return (
                    <li className={style.comment} key={comment?.date}>
                        <p>
                            <strong>Comment from :</strong> {comment?.username}
                        </p>
                        <p>
                            <strong>Time:</strong> {comment.date}
                        </p>
                        <p>{comment?.body}</p>
                    </li>
                );
            })}
        </>
    );
}
export default CommentsList;
