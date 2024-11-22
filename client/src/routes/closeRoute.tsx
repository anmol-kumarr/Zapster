
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../context/store"
import { Navigate } from "react-router-dom"

type Children = {
    children: React.ReactNode
}

const CloseRoute: React.FC<Children> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    if (isAuthenticated) {
        return <>{children}</>
    }
    else {
        return <Navigate to='/login'></Navigate>
    }
}

export default CloseRoute