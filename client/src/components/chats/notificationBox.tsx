import React from "react"
import { deleteNotification, NotificationType, removeFriendRequest, removeRequestSent } from "../../context/notifications"
import { Button } from "@mui/material"
import { useSocket } from "../../socket/socket"
import { useSelector } from "react-redux"
import { RootState } from "../../context/store"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

interface FriendRequestProp {
    notification: NotificationType
}

export const FriendRequest: React.FC<FriendRequestProp> = ({ notification }) => {

    const { isConnected, socket } = useSocket()
    const userId = useSelector((state: RootState) => state.auth.user?._id)
    const myName = useSelector((state: RootState) => state.auth.user?.userName)
    const dispatch: Dispatch = useDispatch()




    const addFriendHandler = () => {
        console.log('hello')
        if (isConnected && userId && notification.userRequested._id) {
            const data = {
                message: `${myName} accept your friend request`,
                userId: userId,
                friendId: notification.userRequested._id,
                notificationId: notification._id
            }
            socket?.emit('acceptRequest', data)
            dispatch(deleteNotification(notification._id))

            dispatch(removeFriendRequest(notification.userRequested._id))

            dispatch(removeRequestSent(notification.userRequested._id))
            console.log('hello')
        }
    }







    // console.log(notification)
    return (
        <div className="flex items-center gap-3 mx-2">
            <div className="w-14 h-14 rounded-full overflow-hidden">
                <img className="w-full h-full" src={notification?.userRequested?.profilePicture} alt="" />
            </div>
            <div>
                <p className="text-sm">
                    <span className="font-medium ">{notification.message.split(' ')[0]} </span>
                    {notification.message.substring(notification.message.indexOf(' ') + 1)}
                </p>

                <div className="my-1 flex gap-2">
                    <Button onClick={addFriendHandler} sx={{ padding: '2px 5px', textTransform: 'none', borderColor: '#6E00FF', color: '#ffff', backgroundColor: '#6E00FF' }} variant="contained">Accept</Button>



                    <Button sx={{ padding: '2px 5px', textTransform: 'none', borderColor: '#6E00FF', color: '#6E00FF' }} variant="outlined" >Cancel</Button>
                </div>
            </div>

        </div>
    )
}




export const RequestAccept: React.FC<FriendRequestProp> = ({ notification }) => {
    return (
        <div className="flex items-center gap-3 mx-2">
            <div className="w-14 h-14 rounded-full overflow-hidden">
                <img className="w-full h-full" src={notification?.userRequested?.profilePicture} alt="" />
            </div>
            <div>
                <p className="text-sm">
                    <span className="font-medium ">{notification.message.split(' ')[0]} </span>
                    {notification.message.substring(notification.message.indexOf(' ') + 1)}
                </p>
            </div>

        </div>
    )
}