import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import { addConversation, addFriends, Conversation, Message } from "../../context/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { ReceiveMessage, SendMessage } from "./messageBox";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiRoutes from "../../services/api";
import apiConnector from "../../services/connector";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";




interface ChatBoxProps {
    messages: Message[] | null
}



const ChatBox: React.FC = () => {
    // const userId = useSelector((state: RootState) => state.auth.user?._id)
    const { conversations } = useSelector((state: RootState) => state.chat)
    const [messages, setMessages] = useState<Message[]>([])
    const { userId } = useParams()
    const dispatch: Dispatch = useDispatch()
    const allFriends = useSelector((state: RootState) => state.chat.friends)
    const conversationRef = useRef<HTMLDivElement>(null)

    const getConversation = async () => {
        toast.loading('Loading')
        try {
            const api: string = `${apiRoutes.getConversation}/${userId}`

            const response = await apiConnector({ method: "GET", url: api })

            const { data: { messages, message, ...restOfData } } = response?.data;





            dispatch(addConversation({ ...restOfData, messages, friendId: userId }))

            setMessages(response?.data?.data?.messages)


            toast.dismiss()
        } catch (err) {
            toast.dismiss()
            toast.error("something went wrong")

            console.log(err)
        }
    }




    const getFriends = async () => {
        toast.loading('Loading')
        const api = apiRoutes.getFriends
        try {

            const response = await apiConnector({ method: 'GET', url: api })

            // console.log(response)

            toast.dismiss()

            dispatch(addFriends(response.data.data.friends))


        } catch (err) {
            console.log(err)
            toast.dismiss()
            toast.error('Something went wrong')
        }
    }


    useEffect(() => {
        if (userId && allFriends.length <= 0) {
            getFriends()
        }

        if (userId) {
            // const friend=

            const conversationAvail = conversations.filter((conversation) => conversation.friendId === userId)

            // console.log('conversationAvail:', conversationAvail)

            if (conversationAvail.length <= 0) {

                getConversation()
                setMessages(conversationAvail[0]?.messages)
            }
        }

    }, [userId])

    useEffect(() => {
        const conversationAvail = conversations.filter((conversation) => conversation.friendId === userId)
        setMessages(conversationAvail[0]?.messages)



    }, [conversations, userId])

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight
        }
        // console.log(typeof (messages[0]?.createdAt))
        // console.log(messages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)))

    }, [messages])








    return (
        <div className="flex w-full pb-2 flex-col justify-between rounded-md h-[calc(100vh-6.5rem)] md:h-[calc(100vh-4.5rem)]" >
            <div ref={conversationRef} className="overflow-y-scroll  w-full  p-2">
                {



                    messages?.map((message) => (

                        message.senderId === userId ? (
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