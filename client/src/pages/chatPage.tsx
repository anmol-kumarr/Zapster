import React from "react"
import SideBar from "../components/chats/sideBar"
import { Outlet, useLocation } from "react-router-dom"
import GroupSection from "../components/chats/groupSection"

const ChatPage: React.FC = () => {
    const location=useLocation().pathname.split('/')
    return (
        <div className="flex bg-bgBlue items-center h-screen">



            <div className="relative md:flex md:gap-7 md:w-11/12 md:mx-auto md:h-[calc(100vh-1rem)] ">
                <div className="fixed right-0 bottom-0 left-0 md:relative md:w-[5%] md:h-full">

                    <SideBar></SideBar>

                </div>
                

                <div className={`text-black ${location.includes('search') ||location.includes('chat')?'w-[calc(100%-10%)]':'w-[calc(100%-55%)]'}`}>
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}
export default ChatPage