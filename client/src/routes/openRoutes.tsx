import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { Navigate } from "react-router-dom";

interface OpenRoutesProps {
    children: React.ReactNode
}


const OpenRoutes: React.FC<OpenRoutesProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    console.log(isAuthenticated)

    if (!isAuthenticated) {
        return <>{children}</>
    } else {
        return <Navigate to='/user/home'></Navigate>
    }
}

export default OpenRoutes