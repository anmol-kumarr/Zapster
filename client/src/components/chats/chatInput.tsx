import React, { FormEvent, useEffect, useState } from "react"
import { IoMdSend } from "react-icons/io"
import { useParams } from "react-router-dom"
import { useSocket } from "../../context/socketContext"
import toast from "react-hot-toast"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
import { RootState } from "../../context/store"


const ChatInput: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const { socket, isConnected } = useSocket()
    const auth = useSelector((state: RootState) => state.auth.user)
    const { userId } = useParams()

    socket.on('receiveMessage', (data) => {
        console.log(data)
    })
    useEffect(() => {
        const socket = io('http://localhost:4000', {
            query: {
                userId: auth?._id
            }
        })
        socket.connect()
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const data = {
            message,
            userId
        }
        socket.emit('send', data)
        console.log(data)
        socket.emit('send', data)
    }


    return (
        <form onSubmit={handleSubmit} action="">

            <div className="w-11/12 my-3 mx-auto  flex gap-3">

                <div className="w-full overflow-hidden">
                    <input className="bg-bgBlue w-full border-[1.5px] rounded-xl border-bor outline-none py-2 px-5 font-inter" type="text" placeholder="Message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <button type="submit" className="flex items-center justify-center text-2xl text-white bg-darkBlue px-3 py-1 rounded-xl">
                    <IoMdSend className=""></IoMdSend>
                </button>

            </div>
        </form>
    )
}
export default ChatInput