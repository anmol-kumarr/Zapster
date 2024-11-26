import GroupSection from "./groupSection"
import UserBar from "./userBar"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import apiConnector from "../../services/connector"
import apiRoutes from "../../services/api"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { addConversation, addFriends, Message } from "../../context/chatSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../context/store"
import ChatBox from "./chatBox"
import { useParams } from "react-router-dom"
import ChatImage from '../../assets/message-section.svg'
const ChatSection = () => {

    const dispatch: Dispatch = useDispatch()
    const { userId } = useParams()
    const [showChat, setShowChat] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([])
    const { conversations } = useSelector((state: RootState) => state.chat)


    const allFriends = useSelector((state: RootState) => state.chat.friends)
    // const dispatch: Dispatch = useDispatch()

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
        if (allFriends.length === 0) {
            getFriends()
        }
    }, [])


    const getConversation = async () => {
        toast.loading('Loading')
        try {
            const api: string = `${apiRoutes.getConversation}/${userId}`

            const response = await apiConnector({ method: "GET", url: api })

            const { data: { message, ...restOfData } } = response?.data;


            dispatch(addConversation({ ...restOfData, friendId: userId }))

            setMessages(response?.data?.data?.messages)


            toast.dismiss()
        } catch (err) {
            toast.dismiss()
            toast.error("something went wrong")

            console.log(err)
        }
    }


    useEffect(() => {
        if (userId) {

            setShowChat(true)
            const conversationAvail = conversations.filter((conversation) => conversation.friendId === userId)

            // console.log('conversationAvail:', conversationAvail)

            if (conversationAvail.length <= 0) {

                getConversation()
                setMessages(conversationAvail[0]?.messages)
            }
        }
        else {
            setShowChat(false)
        }
    }, [userId])
    useEffect(() => {
        console.log("messages", messages)

    }, [messages])


    return (
        <div className="flex gap-5 h-full  ">
            <div className="w-[25%]">
                <GroupSection></GroupSection>
            </div>
            <div className=" rounded-md bg-white w-[calc(100%-30%)] shadow-[0px_0px_4px_#79C5EF]">
                {
                    showChat === true ? (
                        <>
                            <UserBar></UserBar>

                            <ChatBox messages={messages}></ChatBox>

                        </>
                    ) : (
                        <div className="h-[calc(100vh-1rem)]">

                            <img className="h-full w-full" src={ChatImage} alt="" />

                        </div>
                    )


                }

            </div>

        </div>
    )
}
export default ChatSection