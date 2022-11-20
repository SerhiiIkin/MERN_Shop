import { useAppSelector } from "../../hooks/redux";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import style from "./CommentsList.module.css";

function CommentsList() {
    const { comments, loading, error } = useAppSelector(
        (state) => state.comments
    );

    return (
        <>
            {loading && <Loader />}
            {error && (
                <ErrorMessage
                    style={style.error}
                    error={"Cant get comments!"}
                />
            )}
            {comments?.map((comment) => {
                const { _id, date, username, body } = comment;
                return (
                    <li className={style.comment} key={_id}>
                        <p>
                            <strong>Comment from :</strong> {username}
                        </p>
                        <p>
                            <strong>Time:</strong> {date}
                        </p>
                        <p>{body}</p>
                    </li>
                );
            })}
        </>
    );
}
export default CommentsList;
