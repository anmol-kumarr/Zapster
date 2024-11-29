import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchFromList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    return (
        <div>
            <div className="flex rounded-lg overflow-hidden px-2 items-center gap-1 border-[1px] md:border-b-[1px] border-gray-300 mb-2">
                <p className="-mb-[1px] text-textGrey text-xl"><IoSearch></IoSearch></p>
                <div>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="border-none bg-transparent outline-none p-3 md:p-2" type="text" placeholder="Search" id="search" />
                </div>
            </div>
        </div>
    )
}
export default SearchFromList