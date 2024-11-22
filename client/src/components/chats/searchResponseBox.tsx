import React from "react"



const SearchResponseBox: React.FC<SearchProps> = ({ profilePicture, fullName, userName }) => {
    return (
        <div className="cursor-pointer flex gap-2 px-3 py-2 items-center  w-full">
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