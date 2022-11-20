import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReduce from "./slices/productSlice"
import authReduce from "./slices/authSlice"
import commentsReduce from "./slices/commentsSlice"
import basketSlice from './slices/basketSlice'

const rootReducer = combineReducers({
  products: productReduce,
  auth: authReduce,
  comments: commentsReduce,
  basket: basketSlice,
})


export function setupStore() {
  return configureStore({
    reducer:rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]