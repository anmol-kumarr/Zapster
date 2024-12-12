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
        <div className="bg-themeBlue w-full sm:text-3xl text-3xl text-white md:h-full md:rounded-lg flex md:flex-col md:justify-between md:items-center items-center">


            <div className="w-full  flex md:flex-col gap-5 items-center md:justify-center justify-around md:py-5 pb-3 pt-3  px-2 sm:px-0">

                <Link to='home'>
                    <div className={`w-full cursor-pointer ${location.includes('home') ? 'text-[#D1A3FF]' : ''}`}>
                        <GoHomeFill></GoHomeFill>
                    </div>
                </Link>


                <Link to='chat'>
                    <div  className={`w-full cursor-pointer ${location.includes('chat') ? 'text-[#D1A3FF]' : ''}`}>
                        <BsChatSquareDotsFill></BsChatSquareDotsFill>
                    </div>
                </Link>
                <Link to='search'>
                    <div  className={`w-full cursor-pointer ${location.includes('search') ? 'text-[#D1A3FF]' : ''}`}>
                        <IoSearch></IoSearch>
                    </div>
                </Link>
                <Link to='notification'>
                    <div  className={`w-full cursor-pointer ${location.includes('notification') ? 'text-[#D1A3FF]' : ''}`}>
                        <IoNotifications></IoNotifications>
                    </div>
                </Link>
                <Link to='setting'>
                    <div  className={`w-full cursor-pointer ${location.includes('setting') ? 'text-[#D1A3FF]' : ''}`}>
                        <IoMdSettings></IoMdSettings>
                    </div>
                </Link>



                {/* <div className="md:pb-5 block md:hidden">
                    <TbLogout2></TbLogout2>
                </div> */}

            </div>


            <div className="md:pb-5 hidden md:block">
                <TbLogout2></TbLogout2>
            </div>
        </div>
    )
}
export default SideBar