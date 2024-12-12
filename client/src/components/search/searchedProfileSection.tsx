import React from "react"
import { SearchedProfile } from "./searchSection"
import { Button } from "@mui/material"
import { CiLock } from "react-icons/ci"

interface SearchProfileSectionProps {
    searchedProfile: SearchedProfile |null
}

const SearchedProfileSection: React.FC<SearchProfileSectionProps> = ({ searchedProfile }) => {
    console.log(searchedProfile)
    return (
        <div className="w-full h-full rounded-md bg-[#eff6fcbb] md:shadow-[0px_0px_4px_#e2ccff] px-5">
            <div className="py-5 w-full  flex gap-5 items-center justify-center">
                <div className="w-1/6 flex justify-center items-center">

                    <div className="w-24 h-24">
                        <img className="w-full h-full" src={searchedProfile?.profilePicture} alt="" />
                    </div>
                </div>
                <div className="w-2/4">

                    <div className="flex gap-3 my-5 justify-center items-center">
                        <h3 className="font-medium text-lg text-gray-800">{searchedProfile?.userName}</h3>
                        <Button
                            sx={{ fontFamily: "revert", padding: "5px", fontSize: "0.7rem", backgroundColor: '#6E00FF', '&:hover': { backgroundColor: '#5a00cc' } }}
                            variant="contained"
                        >Follow</Button>
                    </div>

                    <div className="w-full">
                        <div className="flex w-full justify-around">
                            <p><span className="font-bold text-semibold text-textBlack">10</span> posts</p>
                            <p><span className="font-bold text-semibold text-textBlack">10</span> Followers</p>
                            <p><span className="font-bold text-semibold text-textBlack">10</span> Following</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" h-[calc(100vh-9.7rem)] flex flex-col justify-evenly items-center  ">
                <hr className="w-full" />
                <h2 className="text-2xl flex  justify-center items-center gap-1">

                    <CiLock></CiLock>
                    This account is private
                </h2>
            </div>

        </div>

    )
}

export default SearchedProfileSection