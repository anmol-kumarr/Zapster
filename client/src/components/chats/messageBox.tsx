import React from "react";
import { Message } from "../../context/chatSlice";


type MessageProps={
    message:Message
}


const MessageBox: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className="flex items-start space-x-2">
            <div className="bg-gray-300 text-gray-900 p-3 rounded-lg rounded-bl-none max-w-xs">
                <p>{message?.content}</p>

            </div>
        </div>

    )
}
export default MessageBox