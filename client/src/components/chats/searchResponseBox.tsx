import React from "react"
import { SearchProps } from "./searchBar"
import { NavigateFunction, useNavigate } from "react-router-dom"



const SearchResponseBox: React.FC<SearchProps> = ({ profilePicture, fullName, userName, _id }) => {

    
    const navigate: NavigateFunction = useNavigate()
    return (
        <div onClick={() => navigate(`${_id}`,{replace:true})} className="cursor-pointer flex gap-2 px-3 py-2 items-center  w-full">
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
export default SearchResponseBox