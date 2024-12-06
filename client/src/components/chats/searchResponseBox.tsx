import React from "react"
import { SearchProps } from "./searchBar"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useSocket } from "../../socket/socket"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { RootState } from "../../context/store"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { addOneRequestSend } from "../../context/notifications"



const SearchResponseBox: React.FC<SearchProps> = ({ profilePicture, fullName, userName, _id }) => {
    console.log(_id)

    const navigate: NavigateFunction = useNavigate()
    const { socket, isConnected } = useSocket()
    const userId = useSelector((state: RootState) => state.auth.user?._id)
    const myName = useSelector((state: RootState) => state.auth.user?.userName)
    const { requestSent, friendRequest } = useSelector((state: RootState) => state.notification)
    const { friends } = useSelector((state: RootState) => state.chat)
    const dispatch: Dispatch = useDispatch()

    const handleSendRequest = () => {
        if (isConnected && userId && _id) {
            const data = {
                message: `${myName} wants to add you as a friend`,
                userId: userId,
                friendId: _id
            }
            socket?.emit('sendNotification', data)
            dispatch(addOneRequestSend(_id))


        }
        else {
            toast.error('Something went wrong')
        }
    }

    const addFriendHandler = () => {
        console.log('hello')
        if (isConnected && userId && _id) {
            const data = {
                message: `${myName} accept your friend request`,
                userId: userId,
                friendId: _id
            }
            socket?.emit('acceptRequest', data)
            console.log('hello')
        }
    }


    const renderActionButton = () => {
        if (_id && friends.some((friend) => friend._id === _id)) {
            console.log('hello')
            // friend._id === _id
            // Already a friend, no button needed
            return null;

        }
        if (_id && requestSent?.includes(_id)) {
            return (
                <Button sx={{ padding: "2px 5px", textTransform: "none", borderColor: "#6E00FF", color: "#6E00FF" }} variant="outlined">
                    Sent
                </Button>
            );
        }
        if (_id && friendRequest.includes(_id)) {
            console.log('hello lei')
            return (
                <Button onClick={addFriendHandler} sx={{ padding: "2px 5px", textTransform: "none", backgroundColor: "#6E00FF" }} variant="contained">
                    Accept
                </Button>
            );
        }



        return (<Button onClick={handleSendRequest} sx={{ padding: "2px 5px", textTransform: "none", backgroundColor: "#6E00FF" }} variant="contained">
            Add friend
        </Button>)

    }










    return (
        // onClick={() => navigate(`${_id}`, { replace: true })}
        <div className="cursor-pointer flex gap-2 px-3 py-2 items-center justify-between w-full">
            <div className="flex gap-2">

                <div className="h-10 w-10 rounded-full">
                    <img className="h-full w-full" src={profilePicture} alt="" />
                </div>
                <div>
                    <p className="font-inter text-sm">{userName}</p>
                    <p className="font-inter text-xs text-textBlack ">{fullName}</p>
                </div>
            </div>
            <div>

                {
                    renderActionButton()
                }
                
            </div>
        </div>
    )
}
export default SearchResponseBox