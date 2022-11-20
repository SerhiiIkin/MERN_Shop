import { IComments } from "./../../models/models";
import { AppDispatch } from "..";
import { commentsSlice } from "../slices/commentsSlice";
import axios from "../../axios";

export function fetchComments(id: string) {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(commentsSlice.actions.fetching());
            const { data } = await axios.get(`api/product/comments/${id}`);
            dispatch(commentsSlice.actions.fetchSuccess(data));
        } catch (e) {
            dispatch(commentsSlice.actions.fetchError(e as Error));
        }
    };
}

export function addComment(newComment: IComments) {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await axios.post(
                "api/product/comment",
                newComment
            );

            dispatch(commentsSlice.actions.addComment(data.newComment));
        } catch (e) {
            dispatch(commentsSlice.actions.fetchError(e as Error));
        }
    };
}
