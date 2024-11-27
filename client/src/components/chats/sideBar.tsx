import React from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { GoHomeFill } from 'react-icons/go'
import { IoMdSettings } from "react-icons/io";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
const SideBar: React.FC = () => {

    const location = useLocation().pathname.split('/')
    // console.log(location)
    return (
        <div className="bg-themeBlue w-full text-3xl text-white md:h-full md:rounded-lg flex md:flex-col md:justify-between items-center">


            <div className="flex md:flex-col gap-5 items-center justify-center py-5">

                <Link to='home'>
                    <div className={`w-full cursor-pointer ${location.includes('home') ? 'border-l-2 border-white border-spacing-x-10' : ''}`}>
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
                <Link to='search'>
                    <div className="cursor-pointer">
                        <IoSearch></IoSearch>
                    </div>
                </Link>




            </div>


            <div className="md:pb-5 ">
                <TbLogout2></TbLogout2>
            </div>
        </div>
    )
}
export default SideBar