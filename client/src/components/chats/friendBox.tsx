import React from "react"
import { SearchProps } from "./searchBar"
import { NavigateFunction, replace, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"



const FriendBox: React.FC<SearchProps> = ({ profilePicture, fullName, userName, _id }) => {

    const navigate: NavigateFunction = useNavigate()
    return (
        <div onClick={() => navigate(`/user/chat/${_id}`,{replace:true})} className="cursor-pointer flex gap-2 px-3 py-2 items-center  w-full">
            <div className="h-10 w-10 rounded-full">
                <img className="h-full w-full" src={profilePicture} alt="" />
            </div>
            <div>
                <p className="font-inter text-sm">{userName}</p>
                <p className="font-inter text-xs text-textBlack ">{fullName}</p>
            </div>
        
        </div>
    )
}
export default FriendBox