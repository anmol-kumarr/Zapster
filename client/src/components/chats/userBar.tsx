import React from "react";
import { IoVideocam } from "react-icons/io5";
import { MdCall } from "react-icons/md";

const UserBar: React.FC = () => {
    return (
        <div className="flex bg-themeBlue text-white rounded-md justify-between py-2 px-4 items-center">
            <div className="flex gap-1 items-center">

                <div className="overflow-hidden h-10 w-10 rounded-full">
                    <img className="w-full h-full" src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </div>

                <div>
                    <h3 className="text-sm">Name</h3>
                    <p className="text-xs">11/11/2024</p>
                </div>
            </div>
            <div className="flex items-center gap-3 text-2xl">
                <div>
                    <MdCall></MdCall>
                </div>
                <div>
                    <IoVideocam></IoVideocam>
                </div>
            </div>
        </div>
    )
}
export default UserBar