import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SignUpDetails } from "../pages/signUp";

type InitialState = {
    process: number,
    details: SignUpDetails
}


const initialState: InitialState = {
    process:1,
    details: {
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        profileImage: ''
    }
}

type Password = {
    password: string,
    confirmPassword: string
}

const signUpSlice = createSlice({
    name: 'SignUp',
    initialState,
    reducers: {
        setFullName: (state, action: PayloadAction<string>) => {
            state.details.fullName = action.payload
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.details.userName = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.details.email = action.payload
        },
        setPassword: (state, action: PayloadAction<Password>) => {
            state.details.password = action.payload.password
            state.details.confirmPassword = action.payload.confirmPassword
        },
        setProfile: (state, action: PayloadAction<string>) => {
            state.details.profileImage = action.payload
        },
        setGender: (state, action: PayloadAction<string>) => {
            state.details.gender = action.payload
        },
        setProcess:(state)=>{
            state.process=state.process+1
        }
    }

})


export const { setFullName, setUserName, setEmail, setPassword, setProfile, setGender,setProcess } = signUpSlice.actions


export default signUpSlice.reducer