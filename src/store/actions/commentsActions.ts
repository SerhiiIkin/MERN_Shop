import { AppDispatch } from "..";
import { IComments } from "../../models/models";
import { commentsSlice } from "../slices/commentsSlice";
import axios from "../../axios";

export function fetchComments() {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(commentsSlice.actions.fetching());
            const response = await axios.get<IComments[]>("comments");
            dispatch(commentsSlice.actions.fetchSuccess(response.data));
        } catch (e) {
            dispatch(commentsSlice.actions.fetchError(e as Error));
        }
    };
}

export function filterComments(comments: IComments[]) {
    return (dispatch:AppDispatch) => {
        dispatch(commentsSlice.actions.filterComments(comments));
    };
}

export function addComment(comment: IComments) {
    return (dispatch:AppDispatch) => {
        dispatch(commentsSlice.actions.addComment(comment));
    };
}
