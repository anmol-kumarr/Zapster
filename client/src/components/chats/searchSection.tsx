import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import SearchImage from '../../assets/search.svg'
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiConnector from "../../services/connector";
import apiRoutes from "../../services/api";
import SearchedProfileSection from "./searchedProfileSection";

export interface SearchedProfile {
    _id: string,
    fullName: string,
    userName: string,
    profilePicture: string,
    gender: string
}
const SearchSection: React.FC = () => {

    const [list, setList] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const userId = useParams()
    const [searchedProfile, setSearchedProfile] = useState<SearchedProfile | null>(null)




    const fetchUserDetails = async () => {
        setLoading(true)

        const api = `${apiRoutes.getUserProfile}/${userId.userId}`
        try {
            const response = await apiConnector({ method: "GET", url: api })

            console.log(response)
            setSearchedProfile(response?.data?.data)

        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        if (userId.userId) {
            fetchUserDetails()
        }
    }, [userId])

    return (
        <div className="flex w-full gap-5 ">
            <div className="md:w-1/3 w-full  mx-auto flex  flex-col items-center ">

                <div className="w-full bg-white">

                    <SearchBar setList={setList}></SearchBar>

                </div>
                <div className="flex h-[calc(100vh-10rem)] mt-10 w-full border-r border-gray-200  justify-center items-center">
                    {
                        !list && <h3 className="font-bold font-inter text-textBlack">Search user and make new friends</h3>
                    }
                </div>
            </div>
            <div className="hidden md:block w-[calc(100%-10rem)] h-full">
                <div className="w-full h-full ">
                    {
                        !userId.userId ? <img src={SearchImage} alt="" /> : <>
                            <SearchedProfileSection searchedProfile={searchedProfile}></SearchedProfileSection>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
export default SearchSection