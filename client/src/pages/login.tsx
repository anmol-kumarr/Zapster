import React, {  useState } from "react"
import LoginImage from '../assets/login.svg'
import { Button, TextField } from "@mui/material"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { emailChecker } from "../utils/inputChecker"
import toast from "react-hot-toast"
import { handlerLogin } from "../services/operation/auth"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

const Login: React.FC = () => {
    interface details {
        email: string,
        password: string
    }

    const [loginDetails, setLoginDetails] = useState<details>({
        email: '',
        password: ''
    })
    const navigate: NavigateFunction = useNavigate()
    const dispatch:Dispatch=useDispatch()
    const loginHandler = (): void => {
        const isValidEmail = emailChecker(loginDetails.email)
        if (!isValidEmail) {
            toast.error('Please enter a valid email')
        }
        // const isPasswordValid = passwordChecker(loginDetails.password)


        if (!loginDetails.password) {
            toast.error('Password is empty')
        }

        handlerLogin({ email: loginDetails.email, password: loginDetails.password, navigate: navigate, dispatch: dispatch })


    }
    return (
        <div className="w-full h-screen">

            <div className="w-11/12 mx-auto h-full flex items-center md:justify-evenly gap-5">
                <div className="hidden md:w-2/5">
                    <img className="w-full h-full" src={LoginImage} alt="" />
                </div>
                <div className="md:w-2/5 w-full">

                    <div className="w-full md:w-10/12 p-5 rounded-md border-[1px] border-gray-600" >
                        <div className="font-inter mb-3">
                            <h1 className="text-gray-700 text-2xl font-semibold">Welcome back</h1>
                            <p className="text-gray-700">Enter your details below</p>

                        </div>
                        <div className="w-full">

                            <TextField
                                onChange={(e) => setLoginDetails(prev => ({ ...prev, email: e.target.value }))}
                                value={loginDetails.email}
                                sx={{
                                    '& .MuiInputBase-root': { height: 50, color: '#6E00FF' },
                                    // '& .MuiInputLabel-root': { color: '#6E00FF' },
                                    '& .MuiOutlinedInput-root': {
                                        // '& fieldset': { borderColor: '#6E00FF' },
                                        '&:hover fieldset': { borderColor: '#6E00FF' },
                                        '&.Mui-focused fieldset': { borderColor: '#6E00FF' },
                                        '& input': { color: '#6E00FF' }
                                    }
                                }}
                                label='Enter your email' variant='outlined'
                                fullWidth
                                margin='normal'
                                type="email"
                            ></TextField>




                            <TextField
                                value={loginDetails.password}
                                onChange={(e) => setLoginDetails(prev => ({ ...prev, password: e.target.value }))}
                                type="password"
                                sx={{
                                    '& .MuiInputBase-root': { height: 50, color: '#6E00FF' },
                                    // '& .MuiInputLabel-root': { color: '#6E00FF' },
                                    '& .MuiOutlinedInput-root': {
                                        // '& fieldset': { borderColor: '#6E00FF' },
                                        '&:hover fieldset': { borderColor: '#6E00FF' },
                                        '&.Mui-focused fieldset': { borderColor: '#6E00FF' },
                                        '& input': { color: '#6E00FF' }
                                    }
                                }}

                                label='Enter your password' variant='outlined'
                                fullWidth
                                margin='normal'




                            ></TextField>

                            <div className="px-2 mt-4 flex justify-between items-center">
                                <Button
                                    onClick={loginHandler}
                                    sx={{ backgroundColor: '#6E00FF', '&:hover': { backgroundColor: '#5a00cc' } }}
                                    variant="contained"
                                >
                                    Login
                                </Button>

                                <Link to='/'>Forget password</Link>
                            </div>
                            <Link to='/signUp'>
                                <div className="mt-4 text-center text-gray-700 font-inter">New user at Zapster? register now</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Login