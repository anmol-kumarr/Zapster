import React from "react";
import ChatInput from "./chatInput";
import { Message } from "../../context/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { ReceiveMessage, SendMessage } from "./messageBox";




interface ChatBoxProps {
    messages: Message[]
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
    const userId = useSelector((state: RootState) => state.auth.user?._id)
    return (
        <div className="flex w-full flex-col justify-between rounded-md  h-[calc(100vh-4.5rem)]" >
            <div className="overflow-y-scroll w-full  p-2">
                {
                    messages?.map((message) => (

                        message.senderId !== userId ? (
                            <ReceiveMessage key={message._id} message={message}></ReceiveMessage>
                        ) : (
                            <SendMessage key={message._id} message={message}></SendMessage>
                        )
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