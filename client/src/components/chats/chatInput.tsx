import React, { FormEvent, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { useSocket } from "../../socket/socket";

// ...existing code...

const ChatInput: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const { socket, isConnected } = useSocket();

    const auth = useSelector((state: RootState) => state.auth.user);
    const { userId } = useParams();




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
            <div className="w-11/12 my-3 mx-auto flex gap-3">
                <div className="w-full overflow-hidden">
                    <input
                        className="bg-bgBlue w-full border-[1.5px] rounded-xl border-bor outline-none py-2 px-5 font-inter"
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