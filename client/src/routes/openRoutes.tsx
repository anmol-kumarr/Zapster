import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { Navigate } from "react-router-dom";

interface OpenRoutesProps{
    children:React.ReactNode
}

const OpenRoutes:React.FC<OpenRoutesProps>=({children})=>{
    const isAuthenticated=useSelector((state:RootState)=>state.auth.isAuthenticated)

    if(isAuthenticated){
        <Navigate to='/chats'></Navigate>
    }else{
        return <>{children}</>
    }
}

export default OpenRoutes