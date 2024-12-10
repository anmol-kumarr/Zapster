
import React, { useEffect, useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Auth } from "../../context/authSlice";
import { RootState } from "../../context/store";

const UserBar: React.FC = () => {
    const { userId } = useParams()
    const allFriends = useSelector((state: RootState) => state.chat.friends)
    const [user, setUser] = useState<Auth>({
        userName: '',
        fullName: '',
        profilePicture: '',
        gender: ''
    })

    useEffect(() => {
        const friends: Auth = allFriends?.filter((friend: Auth) => friend._id === userId)[0]
        if (friends) {

            setUser(friends)
        }
        // console.log('friends', friends)
    }, [userId,allFriends])

    return (
        <div className="flex bg-themeBlue w-full text-white md:rounded-md justify-between py-2 px-4 items-center">
            <div className="flex w-full gap-2 items-center">

                <div className="overflow-hidden h-10 w-10 rounded-full">
                    <img className="w-full h-full" src={user?.profilePicture} alt="" />
                </div>

                <div>
                    <h3 className="text-sm">{user?.fullName}</h3>
                    <p className="text-xs">{user?.userName}</p>
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