import React from "react";
import ChatInput from "./chatInput";

const ChatBox: React.FC = () => {
    return (
        <div className="flex flex-col justify-between rounded-md  h-[calc(100vh-4.5rem)]" >
            <div className="overflow-y-scroll  p-2">

            </div>
            <div className="w-full">

                <ChatInput></ChatInput>
            </div>
        </div>
    )
}
export default ChatBox