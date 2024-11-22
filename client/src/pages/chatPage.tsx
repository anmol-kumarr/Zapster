import React from "react"
import SideBar from "../components/chats/sideBar"
import { Outlet, useLocation } from "react-router-dom"
import GroupSection from "../components/chats/groupSection"

const ChatPage: React.FC = () => {
    const location=useLocation().pathname.split('/')
    return (
        <div className="flex items-center h-screen">



            <div className="flex gap-7 w-11/12 mx-auto h-[calc(100vh-3rem)] ">
                <div className="w-[5%] h-full">

                    <SideBar></SideBar>

                </div>
                

                <div className={`text-black ${location.includes('search')?'w-[calc(100%-10%)]':'w-[calc(100%-55%)]'}`}>
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}
export default ChatPage