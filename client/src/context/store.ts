import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.ts'
import signUpSlice from './signUpSlice.ts'
const store=configureStore({
    reducer:{
        auth:authSlice,
        signUp:signUpSlice
    }
})

export default store

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;