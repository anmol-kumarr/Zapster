import React from "react";
import ChatInput from "./chatInput";
import { Message } from "../../context/chatSlice";
import MessageBox from "./messageBox";



interface ChatBoxProps {
    messages: Message[]
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
    return (
        <div className="flex flex-col justify-between rounded-md  h-[calc(100vh-4.5rem)]" >
            <div className="overflow-y-scroll  p-2">
                {
                    messages?.map((message) => (
                        <MessageBox key={message._id} message={message}></MessageBox>
                        
                    ))
                }
            </div>
            <div className="w-full">

                <ChatInput></ChatInput>
            </div>
        </div>
    )
}
export default ChatBox