import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import FriendBox from "./friendBox";
import SearchFromList from "./searchFromList";



const GroupSection: React.FC = () => {

    const friends = useSelector((state: RootState) => state.chat.friends)
    return (

        <div className="w-full bg-white shadow-[0px_0px_4px_#79C5EF] rounded-md h-[calc(100vh-1rem)]">
            <div>
                <SearchFromList></SearchFromList>
            </div>
            <div>

                {
                    friends.length > 0 && friends.map((friend) => (
                        <React.Fragment key={friend._id}>
                            <FriendBox {...friend}></FriendBox>
                            <hr />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}
export default GroupSection