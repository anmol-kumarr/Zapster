import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.ts'
import signUpSlice from './signUpSlice.ts'
import chatSlice from './chatSlice.ts'
const store = configureStore({
    reducer: {
        auth: authSlice,
        signUp: signUpSlice,
        chat: chatSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;