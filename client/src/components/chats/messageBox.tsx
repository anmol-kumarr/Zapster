import React from "react";
import { Message } from "../../context/chatSlice";


type MessageProps = {
    message: Message
}


export const ReceiveMessage: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className="w-full flex justify-start my-1">

            <div className="flex  space-x-2">
                <div className="bg-gray-300 text-gray-900 px-2 py-2 text-sm rounded-lg rounded-bl-none max-w-xs">
                    <p>{message?.content}</p>

                </div>
            </div>
        </div>

    )
}


export const SendMessage: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className="w-full flex justify-end my-1">

            <div className="flex space-x-2">
                <div className="bg-[#b098f8] text-gray-900 px-3 py-2 text-sm rounded-lg rounded-br-none max-w-xs">
                    <p>{message?.content}</p>

                </div>
            </div>
        </div>
    )
}
