import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import signUpImage from '../assets/signUp.svg'
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import { Email, FullName } from "../components/auth/signUpSteps";
import { useDispatch } from "react-redux";
import { setFullName, setProcess } from "../context/signUpSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export interface SignUpDetails {
    fullName: string,
    userName: string,
    email: string,
    password: string,
    gender: string,
    confirmPassword: string,
    profileImage: string
}
const SignUp: React.FC = () => {
    const [signUpDetails, setSignUpDetails] = useState<SignUpDetails>({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        gender: '',
        confirmPassword: '',
        profileImage: ''
    })

    const step: number = useSelector((state: RootState) => state.signUp.process)


    const dispatch: AppDispatch = useDispatch()

    const navigate:NavigateFunction=useNavigate()




    const signUpHandler = () => {

    }


    return (
        <div className="w-full h-screen">

            <div className="w-11/12 mx-auto h-full flex items-center justify-evenly gap-5">
                <div className="w-2/5">
                    <img className="w-full h-full" src={signUpImage} alt="" />
                </div>
                <div className="w-2/5 ">

                    <div className="w-10/12 p-5  " >
                        <div className="font-inter mb-3">
                            <h1 className="text-gray-700 text-2xl font-semibold">Sign Up to Zapster </h1>
                            <p className="text-gray-700">Enter your details below</p>
                        </div>
                        <div className="">
                            <TransitionGroup className="animation-container">

                                {
                                    step === 1 && (
                                        <CSSTransition key="step1" timeout={500} classNames="parallel">

                                            <FullName fullName={signUpDetails.fullName} setDetails={setSignUpDetails}></FullName>
                                        </CSSTransition>
                                    )
                                }{
                                    step === 2 && (
                                        <CSSTransition key="step2" timeout={500} classNames="parallel">

                                            <Email email={signUpDetails.email}
                                                setDetails={setSignUpDetails}></Email>
                                        </CSSTransition>
                                    )
                                }

                            </TransitionGroup>

                        </div>
                        <div className="my-2 px-1">
                            <Button

                                onClick={() => dispatch(setProcess())}
                                sx={{ backgroundColor: '#6E00FF', '&:hover': { backgroundColor: '#5a00cc' } }}
                                variant="contained"
                            >Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default SignUp






// <div className="px-2 mt-4 flex justify-between items-center">
// <Button
//     onClick={signUpHandler}
//     sx={{ backgroundColor: '#6E00FF', '&:hover': { backgroundColor: '#5a00cc' } }}
//     variant="contained"
// >
//     Login
// </Button>

// <Link to='/'>Forget password</Link>
// </div>
// <div className="mt-4 text-center text-gray-700 font-inter">New user at Zapster? register now</div>