import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import fetchUser from "../../services/operation/fetchUser";
import SearchResponseBox from "../search/searchResponseBox";


export interface SearchProps {
    fullName: string,
    userName: string,
    profilePicture?: string,
    _id?: string

}
interface SearchBar {
    setList: Dispatch<SetStateAction<boolean>>

}


const SearchBar: React.FC<SearchBar> = ({ setList }) => {

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
        } else (
            setSearchResponse([])
        )
    }, [searchValue])


    useEffect(() => {
        // console.log(searchResponse)
        if (searchResponse.length > 0) {
            setList(true)
        }
        else {
            setList(false)
        }
    }, [searchResponse])



    return (
        <div className="relative">
            <div className="flex rounded-lg overflow-hidden px-2 items-center gap-1 shadow-[1px_1px_5px_#79C5EF]">
                <p className="-mb-[1px] text-textGrey text-xl"><IoSearch></IoSearch></p>
                <div>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className=" p-3 px-3 md:px-0  border-none outline-none md:p-2" type="text" placeholder="Search" id="search" />
                </div>
            </div>

            <div className="absolute top-10 left-0 bg-slate-100 rounded-md my-2 w-full">
                {
                    searchResponse.length > 0 && searchResponse.map((user: SearchProps, index) => (
                        <React.Fragment key={user._id}>
                            <SearchResponseBox  {...user}></SearchResponseBox>
                            {
                                index < searchResponse.length - 1 && <hr></hr>
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </div>

    )
}
export default SearchBar