import React from "react"
import SideBar from "../components/chats/sideBar"

const ChatPage: React.FC = () => {
    return (
        <div className="flex items-center h-screen">

                

            <div className="w-11/12 mx-auto h-[calc(100vh-3rem)] ">
                <div className="w-full h-full">

                    <SideBar></SideBar>

                </div>
            </div>

        </div>
    )
}
export default ChatPage