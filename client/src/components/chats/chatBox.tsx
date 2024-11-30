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
import { useMediaQuery } from "usehooks-ts";




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
    const width = useMediaQuery('(min-width: 768px)')
    const [height, setHeight] = useState<number | null>(null)


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


    // useEffect(() => {
    //     if (width) {
    //         setHeight(window.outerHeight)
    //         const element = document.getElementById('chatSection') as HTMLDivElement | null
    //         if (element) {

    //             element.style.height = `${window.innerHeight - 4 * 302}px`
    //         } else {

    //         }
    //     }
    // }, [])




    // console.log(window.innerHeight)
    // console.log(window.outerHeight)
    // alert(window.outerHeight)




    return (
        <div className="relative flex w-full pb-2 flex-col justify-between rounded-md h-[calc(100vh-10rem)] md:h-[calc(100vh-5rem)]" >
            <div id="chatSection" ref={conversationRef} className={`overflow-y-scroll  w-full  p-2`}>
                {/* {



                    messages?.map((message) => (

                        message.senderId === userId ? (
                            <ReceiveMessage key={message._id} message={message}></ReceiveMessage>
                        ) : (
                            <SendMessage key={message._id} message={message}></SendMessage>
                        )
                    ))
                } */}















                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, dolores dignissimos ad distinctio quae voluptates recusandae laboriosam eius doloribus architecto! Accusamus sunt dolores harum sed iste neque aperiam, magni modi laborum, sapiente error quae asperiores commodi adipisci odio dolorum incidunt eligendi! Facilis corrupti ipsum officia voluptates, illum necessitatibus vel obcaecati similique expedita ex fugiat rerum qui voluptatem quo. Quia asperiores quidem dolorem. Nam sint optio eum iste neque repellat ipsum nihil ab nostrum sequi unde, ipsam perferendis esse fugit voluptate ex debitis obcaecati velit eligendi magnam illum saepe. Temporibus consequatur velit quidem illum, facere ullam dolor officiis inventore laboriosam assumenda itaque, asperiores porro. Nisi iure nam corporis praesentium ex ullam sunt voluptates nesciunt eius ipsam. Animi exercitationem optio libero laborum ab a, earum quos accusamus corrupti eaque suscipit similique debitis quidem eos blanditiis iste hic perferendis dolores ullam, voluptatum quis illo cumque. Dignissimos facere eveniet beatae doloribus reprehenderit, ipsa commodi cupiditate tenetur? Accusamus, optio. Obcaecati provident corrupti quae similique aliquam, rem accusantium voluptatem debitis nobis nisi reiciendis numquam suscipit eius delectus accusamus sunt in sed ratione velit repellendus cum iste possimus iure. Debitis libero reprehenderit, beatae iusto laborum unde sed nobis quam officia voluptas magni dolor repellat nulla dicta. Quam repudiandae ea illum voluptatum atque dignissimos alias, repellendus nemo aperiam recusandae quos cumque, tempore nobis voluptas iusto facilis mollitia distinctio assumenda esse quis dolorum aliquam? Consequuntur optio recusandae distinctio similique doloribus saepe pariatur odio molestias, sed quam eius minus. Magni iure asperiores alias delectus harum officiis nam aliquid eum sequi omnis, debitis necessitatibus blanditiis, doloremque quo vero architecto corrupti non soluta aliquam? Quis aut officiis maiores eaque perspiciatis, veritatis asperiores. Quam nobis asperiores et rerum consequatur, dolores corrupti culpa esse sapiente, laudantium mollitia fugit repellat quis doloremque odio distinctio molestiae porro quidem maxime hic. Voluptatem nobis modi quae sint itaque.
            </div>
            <div className="fixed left-0 right-0 bottom-12 md:relative md:bottom-0 md:left-0 md:right-0   md:bg-transparent bg-white md:shadow-[1px_0px_5px_#e2ccff] w-full">

                <ChatInput></ChatInput>
            </div>
        </div>
    )
}
export default ChatBox