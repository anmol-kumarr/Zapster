import React from "react"
import { SearchProps } from "./searchBar"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useSocket } from "../../socket/socket"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { RootState } from "../../context/store"



const SearchResponseBox: React.FC<SearchProps> = ({ profilePicture, fullName, userName, _id }) => {


    const navigate: NavigateFunction = useNavigate()
    const { socket, isConnected } = useSocket()
    const userId=useSelector((state:RootState)=>state.auth.user?._id)
    const myName=useSelector((state:RootState)=>state.auth.user?.userName)

    const handleSendRequest = () => {
        if (isConnected && userId && _id) {
            const data={
                message:`${myName} wants to add you as a friend`,
                userId:userId,
                friendId:_id
            }
            socket?.emit('sendNotification',data)
            
        }
        else{
            toast.error('Something went wrong')
        }
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
                <Button onClick={handleSendRequest} sx={{ padding: '2px 5px', textTransform: 'none', backgroundColor: '#6E00FF' }} variant="contained" >Add friend</Button>
            </div>
        </div>
    )
}
export default SearchResponseBox