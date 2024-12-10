import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Welcome from '../assets/welcome.svg'
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../context/store";
import { getAllNotification } from "../services/operation/notification";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
const HomePage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate()
    const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated)
    const dispatch:Dispatch=useDispatch()
    useEffect(() => {
        if(isAuthenticated){
            getAllNotification({dispatch,navigate})
        }

        // setTimeout(() => {
        //     navigate('/user/home')
        // }, 3000);
    }, [])
    return (
        <div className="w-11/12 mx-auto h-screen">
            <div className="h-3/5">
                <img className="w-full h-full" src={Welcome} alt="" />
            </div>
            <h1 className="font-inter text-center my-10 font-semibold text-textBlack text-2xl">Welcome to Zapster</h1>
            <div className="flex flex-col justify-center">


                {
                    !isAuthenticated ? (<div className="flex gap-5 justify-center">
                        <Link to='/login'>
                            <Button
                                sx={{ backgroundColor: '#6E00FF', '&:hover': { backgroundColor: '#5a00cc' } }}
                                variant="contained"
                            >Login</Button>
                        </Link>
                        <Link to='/signUp'>
                            <Button
                                sx={{ backgroundColor: '#6E00FF', '&:hover': { backgroundColor: '#5a00cc' } }}
                                variant="contained"
                            >SignUp</Button>
                        </Link>
                    </div>) : (
                        <h3 className="font-inter text-center">Loading...</h3>
                    )
                }
            </div>
        </div>
    )
}
export default HomePage