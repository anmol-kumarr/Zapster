import toast from "react-hot-toast"
import apiConnector from "../connector"
import apiRoutes from "../api"
import { Dispatch } from "redux"
import { setProcessIncrease } from "../../context/signUpSlice"
import { SignUpDetails } from "../../pages/signUp"
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom"
import { setIsAuthenticated } from "../../context/authSlice"

interface CheckUserNameProps {
    dispatch: Dispatch,
    userName: string
}

export const checkUserName = async ({ dispatch, userName }: CheckUserNameProps) => {
    const api: string = apiRoutes.userNameCheck
    console.log(api)
    toast.loading('Loading')
    try {
        const response = await apiConnector({ method: 'POST', url: api, bodyData: { userName } })
        console.log(response)
        if (!response.data.success) {
            toast.dismiss()
            toast.error('Username already exist')
        }
        toast.dismiss()
        dispatch(setProcessIncrease())
        return response.data.success

    } catch (err) {
        console.log(err)
        toast.dismiss()
        toast.error("Username already exist")
    }
}

interface OtpProps {
    dispatch: Dispatch,
    email: string,
    userName: string
}

export const otpSender = async ({ dispatch, email, userName }: OtpProps) => {
    const api: string = apiRoutes.otpRoute
    toast.loading('Loading')
    try {
        const response = await apiConnector({ method: 'POST', url: api, bodyData: { email, userName } })

        console.log(response)
        if (!response.data.success) {
            toast.dismiss()
            toast.error(response.data.message)
        }
        toast.dismiss()
        toast.success('Otp send successfully')
        dispatch(setProcessIncrease())

    } catch (err) {
        console.log(err)
        toast.dismiss()
        toast.error('Failed to send otp')
    }
}

interface SignUpHandlerProps {
    signUpDetails: SignUpDetails
    dispatch: Dispatch,
    navigate: NavigateFunction
}

export const signUpHandler = async ({ navigate, dispatch, signUpDetails }: SignUpHandlerProps) => {
    const api = apiRoutes.signUpRoute

    toast.loading('Loading')
    try {
        const response = await apiConnector({ method: 'POST', url: api, bodyData: { ...signUpDetails } })
        console.log(response)
        toast.dismiss()
        if (!response.data.success) {
            toast.error(response.data.message)
        }

        const authValue = response.data.user
        authValue.validUpto = Date.now()
        toast.success('Signup successful')
        localStorage.setItem('zapster', JSON.stringify(response.data.user))
        dispatch(setIsAuthenticated({ ...response?.data?.user }))
        navigate('/user/home')


    } catch (err) {
        console.log(err)
        toast.dismiss()
        toast.error('Something went wrong')
    }
}



interface LoginProps {
    email: string,
    password: string,
    navigate: NavigateFunction,
    dispatch: Dispatch
}

export const handlerLogin = async ({ email, password, navigate, dispatch }: LoginProps) => {

    toast.loading('Loading')
    const api: string = apiRoutes.loginRoute
    try {
        const response = await apiConnector({ method: 'POST', url: api, bodyData: { email, password } })

        console.log(response)

        if (!response?.data?.message) {
            toast.dismiss()
            toast.error("login failed")
            throw new Error("failed login")
        }
        toast.dismiss()

        toast.success("login successful")

        dispatch(setIsAuthenticated({ ...response?.data?.user }))




        localStorage.setItem('zapster', JSON.stringify({ ...response?.data?.user, validUpto: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }))

        navigate('/user/home')

    } catch (err) {
        console.log(err)
        toast.dismiss()
        toast.error('Login failed')
    }
}