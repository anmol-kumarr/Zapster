import React from "react"
import { SearchProps } from "./searchBar"
import { NavigateFunction, useNavigate } from "react-router-dom"
// import { Button } from "@mui/material"



const FriendBox: React.FC<SearchProps> = ({ profilePicture, fullName, userName, _id }) => {

    const navigate: NavigateFunction = useNavigate()
    return (
        <div onClick={() => navigate(`/user/chat/${_id}`,{replace:true})} className="font-sans cursor-pointer flex gap-2 sm:px-3 sm:py-2 py-4 px-3 items-center  w-full">
            <div className="h-11 w-11 rounded-full">
                <img className="h-full w-full" src={profilePicture} alt="" />
            </div>
            <div>
                <p className="font-inter text-base">{userName}</p>
                <p className="font-inter text-sm text-textBlack ">{fullName}</p>
            </div>
        
        </div>
    )
}
export default FriendBox