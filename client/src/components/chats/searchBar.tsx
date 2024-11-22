import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import fetchUser from "../../services/operation/fetchUser";
import SearchResponseBox from "./searchResponseBox";


export interface SearchProps {
    fullName: string,
    userName: string,
    profilePicture: string,
    _id:string

}
const SearchBar: React.FC = () => {

    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResponse, setSearchResponse] = useState<SearchProps[]>([])




    useEffect(() => {
        if (searchValue.length > 2) {
            let timeOut = setTimeout(() => {
                fetchUser({ userId: searchValue, setSearchResponse })
            }, 1000);

            return () => {
                clearTimeout(timeOut)
            }
        }else(
            setSearchResponse([])
        )
    }, [searchValue])
    useEffect(() => {
        console.log(searchResponse)
    }, [searchResponse])
    return (
        <div className="relative">
            <div className="flex rounded-lg overflow-hidden px-2 items-center gap-1 shadow-[1px_1px_5px_#79C5EF]">
                <p className="-mb-[1px] text-textGrey text-xl"><IoSearch></IoSearch></p>
                <div>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="border-none outline-none p-2" type="text" placeholder="Search" id="search" />
                </div>
            </div>

            <div className="absolute top-10 left-0 bg-slate-100 rounded-md my-2 w-full">
                {
                    searchResponse.length > 0 && searchResponse.map((user: SearchProps,index) => (
                        <>
                            <SearchResponseBox key={user._id} {...user}></SearchResponseBox>
                            {
                                index<searchResponse.length-1 && <hr></hr>
                            }
                        </>
                    ))
                }
            </div>
        </div>

    )
}
export default SearchBar