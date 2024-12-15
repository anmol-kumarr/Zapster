import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import { addConversation, addFriends, addPaginationMessage, Message } from "../../context/chatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { ReceiveMessage, SendMessage } from "./messageBox";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiRoutes from "../../services/api";
import apiConnector from "../../services/connector";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
// import { useMediaQuery } from "usehooks-ts";




// interface ChatBoxProps {
//     messages: Message[] | null
// }



const ChatBox: React.FC = () => {
    // const userId = useSelector((state: RootState) => state.auth.user?._id)
    const { conversations } = useSelector((state: RootState) => state.chat)
    const [messages, setMessages] = useState<Message[]>([])
    const { userId } = useParams()
    const dispatch: Dispatch = useDispatch()
    const allFriends = useSelector((state: RootState) => state.chat.friends)
    const conversationRef = useRef<HTMLDivElement>(null)

    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        console.log(page)
    }, [page])

    const getConversation = async () => {
        toast.loading('Loading')
        const limit = 20



        try {
            const api: string = `${apiRoutes.getConversation}/${userId}?page=${page}&limit=${limit}`

            const response = await apiConnector({ method: "GET", url: api })

            const { data: { messages, message, ...restOfData } } = response?.data;
            // console.log(response)





            dispatch(addConversation({ ...restOfData, messages, friendId: userId, meta: response?.data?.meta }))


            // setMessages(prev => prev ? [...response?.data?.data?.messages, ...prev] : [response?.data?.data?.messages])

            // setPage(page => page + 1)

            toast.dismiss()
            console.log('page', page)
            // console.log(page)
            if (page > 1) {
                // setLoading(true)
                dispatch(addPaginationMessage({ messages, ...restOfData, friendId: userId, meta: response?.data?.meta }))
                setMessages((prev) => [...response?.data?.data?.messages, ...prev])
            } else {

                setMessages(response?.data?.data?.messages)
            }

            // return response
            // setLoading(false)
        } catch (err) {
            toast.dismiss()
            toast.error("something went wrong")

            console.log(err)
        }
    }
    useEffect(() => {
        console.log(userId, page)
        if (page > 1) {
            getConversation()
            // setLoading(false)

        }

    }, [page])



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

        
        setPage(1)
        const conversationAvail = conversations.filter((conversation) => conversation.friendId === userId)
        setMessages(conversationAvail[0]?.messages)



    }, [conversations, userId])

    useEffect(() => {
        if (conversationRef.current) {

            conversationRef.current.scrollTop = conversationRef.current.scrollHeight
        }




    }, [messages])

    // scrollHeight is the total height of the element that is scrollable
    // clientHeight is the height of the element that is visible
    // scrollTop is the distance between top and the bottom
    useEffect(() => {
        const ref = conversationRef.current
        const handleScroll = () => {
            // console.log(conversations)
            if (ref && conversations.length > 0) {

                if (ref.scrollTop === 0) {
                    const findPage = conversations.filter((conversation) => conversation.friendId === userId)[0]
                    // console.log('hello')

                    if (findPage && findPage?.meta && findPage?.meta?.totalPages > findPage?.meta?.currentPage) {
                        setPage(findPage?.meta?.currentPage + 1)
                        console.log('hello2')


                    }
                    console.log('not')
                }

            }
        }
        if (ref && conversations) {
            ref.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (ref) {
                ref.removeEventListener('scroll', handleScroll)
            }
        }
    }, [conversations])



    return (
        <div className="relative flex w-full md:pb-4 flex-col justify-between rounded-md h-[calc(100vh-10rem)] md:h-[calc(100vh-5rem)]" >
            <div id="chatSection" ref={conversationRef} className={`overflow-y-scroll  w-full md:my-2 mb-5  p-2`}>
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
            <div className="fixed  left-0 right-0 bottom-12 md:relative md:bottom-0 md:left-0 md:right-0   md:bg-transparent bg-white md:shadow-[1px_0px_5px_#e2ccff] w-full">

                <ChatInput></ChatInput>
            </div>
        </div>
    )
}
export default ChatBox