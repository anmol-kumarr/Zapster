import React from "react"
import SideBar from "../components/chats/sideBar"
import { Outlet } from "react-router-dom"
import GroupSection from "../components/chats/groupSection"

const ChatPage: React.FC = () => {
    return (
        <div className="flex items-center h-screen">



            <div className="flex gap-7 w-11/12 mx-auto h-[calc(100vh-3rem)] ">
                <div className="w-[5%] h-full">

                    <SideBar></SideBar>

                </div>
                <div className="w-[25%]">
                    <GroupSection></GroupSection>
                </div>

                <div className="text-black w-[calc(100%-55%)]">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}
export default ChatPage