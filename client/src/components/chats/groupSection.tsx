import React from "react";
import { IoSearch } from "react-icons/io5";

const GroupSection: React.FC = () => {
    return (
        <div>
            <div>
                <div className="flex rounded-lg overflow-hidden px-2 items-center gap-1 shadow-[1px_1px_5px_#79C5EF]">
                    <p className="-mb-[1px] text-textGrey text-xl"><IoSearch></IoSearch></p>
                    <div>
                        <input className="border-none outline-none p-2" type="text" placeholder="Search" id="search" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GroupSection