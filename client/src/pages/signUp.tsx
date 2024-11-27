import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import signUpImage from '../assets/signUp.svg'
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import { Email, FullName, Gender, Otp, Password, UserName } from "../components/auth/signUpSteps";
import { useDispatch } from "react-redux";
import { setProcessDecrease, setProcessIncrease } from "../context/signUpSlice";

import { checkUserName, otpSender, signUpHandler } from "../services/operation/auth";
import { emailChecker } from "../utils/inputChecker";
import toast from "react-hot-toast";

export interface SignUpDetails {
    fullName: string,
    userName: string,
    email: string,
    password: string,
    gender: string,
    confirmPassword: string,
    profileImage: string,
    otp: string
}
const SignUp: React.FC = () => {
    const [signUpDetails, setSignUpDetails] = useState<SignUpDetails>({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        gender: '',
        confirmPassword: '',
        profileImage: '',
        otp: ''
    })

    const step: number = useSelector((state: RootState) => state.signUp.process)


    const dispatch: AppDispatch = useDispatch()

    const navigate: NavigateFunction = useNavigate()


    useEffect(() => {
        console.log(signUpDetails)
    }, [signUpDetails])

    const nextHandler = () => {
        if (step === 1) {
            signUpDetails.fullName.length > 0 ?
                dispatch(setProcessIncrease()) : toast.error('Please fill the details')
        }
        if (step === 2) {
            signUpDetails.userName.length > 0 ? checkUserName({ dispatch, userName: signUpDetails.userName }) : toast.error('please fill the details')
        }
        if (step === 3) {
            signUpDetails.gender === 'Male' || 'Female' || 'Others' ?
                dispatch(setProcessIncrease()) : toast.error('please fill the details')
        }

        if (step === 4) {
            emailChecker(signUpDetails.email) && otpSender({ dispatch, email: signUpDetails.email, userName: signUpDetails.userName })
        }

        if (step === 5) {
            signUpDetails.password.length > 0 && signUpDetails.confirmPassword.length > 0 ?
                dispatch(setProcessIncrease()) : toast.error('please fill the details')
        }
        if (step === 6) {
            signUpDetails.otp.length === 6 && signUpHandler({navigate, dispatch, signUpDetails })
        }






    }


    return (
        <div className="w-full h-screen">

            <div className="w-11/12 mx-auto h-full flex items-center justify-evenly gap-5">
                <div className="hidden md:w-2/5">
                    <img className="w-full h-full" src={signUpImage} alt="" />
                </div>
                <div className="md:w-2/5 ">

                    <div className="md:w-10/12 p-5 ">
                        <div className="font-inter mb-5">
                            <h1 className="text-gray-700 text-2xl font-semibold">Sign Up to Zapster </h1>
                            <p className="text-gray-700">Enter your details below</p>
                        </div>
                        <div className="">


                            {
                                step === 1 && (


                                    <FullName fullName={signUpDetails.fullName} setDetails={setSignUpDetails}></FullName>

                                )
                            }{
                                step === 2 && (


                                    <UserName userName={signUpDetails.userName} setDetails={setSignUpDetails}></UserName>

                                )
                            }
                            {
                                step === 3 && (
                                    <Gender gender={signUpDetails.gender} setDetails={setSignUpDetails}></Gender>
                                )
                            }
                            {
                                step === 4 && (
                                    <Email email={signUpDetails.email}
                                        setDetails={setSignUpDetails}></Email>
                                )
                            }
                                {
                                step === 5 && (
                                    <Password password={signUpDetails.password} confirmPassword={signUpDetails.confirmPassword} setDetails={setSignUpDetails}></Password>
                                )
                            }
                            {
                                step === 6 && (
                                    <Otp otp={signUpDetails.otp} setDetails={setSignUpDetails}></Otp>
                                )
                            }
                        




                        </div>
                        <div className="my-5 px-1 flex justify-between items-center">
                            {
                                step >= 2 && <Button sx={{ color: '#6E00FF' }} onClick={() => dispatch(setProcessDecrease())}>Back</Button>
                            }
                            <Button


                                onClick={nextHandler}
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