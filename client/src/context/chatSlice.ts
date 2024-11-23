import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "./authSlice";

interface Chat{
    friends:Auth[]

}

const initialState:Chat={
        friends:[]
}

const chatSlice=createSlice({
    name:'Chat',
    initialState,
    reducers:{
        addFriends:(state,action:PayloadAction<Auth[]>)=>{
            state.friends=action.payload
        }
    }
})


export const {addFriends}=chatSlice.actions

export default chatSlice.reducer