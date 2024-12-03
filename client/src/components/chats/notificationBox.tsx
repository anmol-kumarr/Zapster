import React from "react"
import { NotificationType } from "../../context/notifications"
import { Button } from "@mui/material"

interface FriendRequestProp{
    notification:NotificationType
}

export const FriendRequest:React.FC<FriendRequestProp>=({notification})=>{
    console.log(notification)
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
                    <Button sx={{ padding: '2px 5px', textTransform: 'none',borderColor: '#6E00FF',color:'#ffff',backgroundColor:'#6E00FF'}} variant="contained">Accept</Button>
                    <Button sx={{ padding: '2px 5px', textTransform: 'none',borderColor: '#6E00FF',color:'#6E00FF'}} variant="outlined" >Cancel</Button>
                </div>
            </div>

        </div>
    )
}