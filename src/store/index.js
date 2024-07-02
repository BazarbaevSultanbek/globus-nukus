import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './Reducers/Reducer'

export const store = configureStore({
    reducer: {
        shop: shopReducer,
    },
})