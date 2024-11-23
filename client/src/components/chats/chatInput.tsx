import React, { useState } from "react"
import { IoMdSend } from "react-icons/io"

const ChatInput: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    return (
        <div className="w-11/12 my-3 mx-auto  flex gap-3">
            <div className="w-full overflow-hidden">
                <input className="bg-bgBlue w-full border-[1.5px] rounded-xl border-bor outline-none py-2 px-5 font-inter" type="text" placeholder="Message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="flex items-center justify-center text-2xl text-white bg-darkBlue px-3 py-1 rounded-xl">
                <IoMdSend className=""></IoMdSend>
            </div>
        </div>
    )
}
export default ChatInput