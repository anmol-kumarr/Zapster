import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import fetchUser from "../../services/operation/fetchUser";

const SearchBar: React.FC = () => {

    const [searchValue, setSearchValue] = useState<string>('')





    useEffect(() => {
        if (searchValue.length > 2) {
            let timeOut = setTimeout(() => {
                fetchUser({ userId: searchValue })
            }, 2000);

            return () => {
                clearTimeout(timeOut)
            }
        }
    }, [searchValue])
    return (
        <div>
            <div className="flex rounded-lg overflow-hidden px-2 items-center gap-1 shadow-[1px_1px_5px_#79C5EF]">
                <p className="-mb-[1px] text-textGrey text-xl"><IoSearch></IoSearch></p>
                <div>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="border-none outline-none p-2" type="text" placeholder="Search" id="search" />
                </div>
            </div>
        </div>

    )
}
export default SearchBar