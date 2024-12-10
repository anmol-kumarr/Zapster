import toast from "react-hot-toast"
import apiRoutes from "../api"
import apiConnector from "../connector"
import { NavigateFunction } from "react-router-dom"
import { Dispatch } from "redux"
import { addFriends } from "../../context/chatSlice"
import {  setData } from "../../context/notifications"

interface GetAllNotificationParaMeter {
    navigate?: NavigateFunction,
    dispatch: Dispatch
}

export const getAllNotification = async ({ navigate, dispatch }: GetAllNotificationParaMeter) => {
    try {
        const api = apiRoutes.getAllRequestAndNotification
        const response = await apiConnector({ method: 'GET', url: api })
        dispatch(addFriends(response?.data?.data?.friends))
        dispatch(setData({
            friendRequest: response?.data?.data?.friendRequest,
            requestSent: response?.data?.data?.requestSend,
            notification: response?.data?.data?.notifications
        }))
        if (navigate) {

            navigate('/user/chat')
        }
        // console.log(response)
    } catch (err) {
        console.log(err)
        toast.error("Something went wrong")
    }
}