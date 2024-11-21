import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Auth={
    userName:string,
    fullName:string,
    token?:string,
    gender?:string,
    profileImage:string,
    password?:null
}

interface InitialState{
    isAuthenticated:boolean,
    user:Auth|null
}

const initialState:InitialState={
    isAuthenticated:localStorage.getItem('zapster')?true:false,
    user:localStorage.getItem('zapster')?JSON.parse(localStorage.getItem('zapster')!):null
    
}

const authSlice=createSlice({
    name:'Auth',
    initialState,
    reducers:{
        setIsAuthenticated:(state,action:PayloadAction<Auth>)=>{
            state.isAuthenticated=true,
            state.user=action.payload
        },
        setLogout:(state)=>{
            state.isAuthenticated=false,
            state.user=null
        }
    }
    
})


export const {setIsAuthenticated,setLogout}=authSlice.actions
export default authSlice.reducer