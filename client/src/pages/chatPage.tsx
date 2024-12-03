import React, { useEffect } from "react"
import SideBar from "../components/chats/sideBar"
import { Outlet, useLocation } from "react-router-dom"
import GroupSection from "../components/chats/groupSection"
import { useSelector } from "react-redux"
import { RootState } from "../context/store"
import { getAllNotification } from "../services/operation/notification"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

const ChatPage: React.FC = () => {
    const location = useLocation().pathname.split('/')
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    const notification = useSelector((state: RootState) => state.notification)
    const dispatch: Dispatch = useDispatch()
    useEffect(() => {
        if (isAuthenticated && notification.notification.length === 0) {
            getAllNotification({ dispatch })
        }
    }, [])



    return (
        <div className="flex   md:bg-bgBlue items-center md:h-screen">



            <div className="relative flex w-full md:p-2 sm:p-0 justify-center md:gap-7 md:w-11/12 mx-auto md:h-[calc(100vh-1rem)] ">
                <div className="fixed right-0 bottom-0 left-0 md:relative md:w-[5%] md:h-full">

                    <SideBar></SideBar>

                </div>


                <div className="text-black w-full md:w-[calc(100%-10%)]">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}
export default ChatPage

// ${location.includes('search') ||location.includes('chat')?'w-[calc(100%-10%)]':'w-[calc(100%-55%)]'}`