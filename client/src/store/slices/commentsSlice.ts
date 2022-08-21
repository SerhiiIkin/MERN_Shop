import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComments } from "../../models/models";

interface CommentsState  {
    loading: boolean
    error: string
    comments: IComments[]
    filteredComments:IComments[]
}

const initialState:CommentsState = {
    loading: false,
    error: "",
    comments: [],
    filteredComments: []
};

export const commentsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true;
        },
        fetchSuccess(state, action: PayloadAction<IComments[]>) {
            state.loading = false
            state.comments = action.payload
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        },
        filterComments(state, action: PayloadAction<IComments[]>) {
            state.filteredComments = action.payload
        },
        addComment(state, action: PayloadAction<IComments>) {
            state.comments.push(action.payload)
        }
        
    },
});

export default commentsSlice.reducer