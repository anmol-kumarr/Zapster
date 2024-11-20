import toast from "react-hot-toast"
import apiConnector from "../connector"
import apiRoutes from "../api"
import { Dispatch } from "redux"
import { setProcessIncrease } from "../../context/signUpSlice"
import { SignUpDetails } from "../../pages/signUp"

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

interface OtpProps{
    dispatch:Dispatch,
    email:string
}

export const otpSender=async({dispatch,email}:OtpProps)=>{
    const api:string=apiRoutes.otpRoute
    toast.loading('Loading')
    try{
        const response=await apiConnector({method:'POST',url:api,bodyData:{email}})

        console.log(response)
        if(!response.data.success){
            toast.error(response.data.message)
        }
        toast.dismiss()
        toast.success('Otp send successfully')
        dispatch(setProcessIncrease())

    }catch(err){
        console.log(err)
        toast.error('Failed to send otp')
    }
}

interface SignUpHandlerProps{
    signUpDetails:SignUpDetails
    dispatch:Dispatch
}

export const signUpHandler=async({signUpDetails,dispatch}:SignUpHandlerProps)=>{
    const api=apiRoutes.signUpRoute
    toast.loading('Loading')
    try{
        const response=await apiConnector({method:'POST',url:api,bodyData:{...signUpDetails}})
        toast.dismiss()
        if(!response.data.success){
            toast.error(response.data.message)
        }
        toast.success('Signup successful')


    }catch(err){
        console.log(err)
        toast.dismiss()
        toast.error('Something went wrong')
    }
}