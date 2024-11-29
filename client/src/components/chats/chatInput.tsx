import React, { FormEvent, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { useSocket } from "../../socket/socket";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";


// ...existing code...

const ChatInput: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const { socket, isConnected } = useSocket();

    const auth = useSelector((state: RootState) => state.auth.user);
    const { userId } = useParams();
    const dispatch:Dispatch=useDispatch()


    

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (socket && isConnected && userId) {
            // Emit an event to the server when the button is clicked
            socket.emit("sendMessage", { message:message,userId:userId });
            console.log("Message sent!");
            setMessage('')
            
            
        } else {
            console.log("Socket is not connected.");
        }
    }


    return (
        <form onSubmit={handleSubmit} action="">
            <div className="md:w-11/12 md:p-0 p-1 my-3 mx-auto flex md:gap-3 gap-1">
                <div className="w-full overflow-hidden">
                    <input
                        className="bg-bgBlue py-3 w-full border-[1.5px] rounded-xl border-bor outline-none md:py-2 px-5 font-inter"
                        type="text"
                        placeholder="Message"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button type="submit" className="flex items-center justify-center text-2xl text-white bg-darkBlue px-3 py-1 rounded-xl">
                    <IoMdSend />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;