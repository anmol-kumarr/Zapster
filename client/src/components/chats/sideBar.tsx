import React from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { GoHomeFill } from 'react-icons/go'
import { IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
const SideBar: React.FC = () => {
    return (
        <div className="bg-themeBlue  text-3xl text-white h-full rounded-lg flex flex-col justify-between items-center">
            <div className="flex flex-col gap-5 items-center py-5">

                <Link to='home'>
                    <div className="cursor-pointer">
                        <GoHomeFill></GoHomeFill>
                    </div>
                </Link>
                <Link to='chat'>
                    <div className="cursor-pointer">
                        <BsChatSquareDotsFill></BsChatSquareDotsFill>
                    </div>
                </Link>
                <Link to='notification'>
                    <div className="cursor-pointer">
                        <IoNotifications></IoNotifications>
                    </div>
                </Link>
                <Link to='setting'>
                    <div className="cursor-pointer">
                        <IoMdSettings></IoMdSettings>
                    </div>
                </Link>




            </div>
            <div className="pb-5">
                <TbLogout2></TbLogout2>
            </div>
        </div>
    )
}
export default SideBar