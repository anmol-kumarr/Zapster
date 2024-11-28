import React from "react"
import { BsChatLeftTextFill } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { IoNotifications, IoSettingsSharp } from "react-icons/io5"

const SettingsSideBar: React.FC = () => {

    const sideBarData = [
        {
            icon: <FaUserAlt></FaUserAlt>,
            link: 'profile',
            text: 'Profile'
        },
        {
            icon: <IoSettingsSharp></IoSettingsSharp>,
            link: 'account',
            text: "Account"
        },
        {
            icon: <BsChatLeftTextFill></BsChatLeftTextFill>,
            link: 'chat',
            text: 'Chat'
        },
        {
            icon: <IoNotifications></IoNotifications>,
            link: 'notification',
            text: "Notification"
        }
    ]
    return (
        <div className="bg-white h-full">
            <div className="h-full">
                {
                    sideBarData.map((link) => (
                        <div className="flex items-center">
                            {link.icon}
                            {link.text}
                        </div>
                    ))
                }
            </div>
        </div>
    )

}
export default SettingsSideBar