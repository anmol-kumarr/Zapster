import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import FriendBox from "./friendBox";
import SearchFromList from "./searchFromList";
import { useMediaQuery } from "usehooks-ts";



const GroupSection: React.FC = () => {

    const element = document.querySelector('#group-section') as HTMLDivElement | null;
    const height = useMediaQuery('(min-width: 768px)')
    if (!height) {
        function adjustHeight() {
            if (element) {

                element.style.height = `${window.innerHeight - 4.5 * 16}px`
            } else {

            }
        }
        window.addEventListener('resize', adjustHeight);

        adjustHeight();
    }

    const friends = useSelector((state: RootState) => state.chat.friends)
    return (
        // md:h-[calc(100vh-1rem)]
        <div id="group-section" className="w-full overflow-y-scroll md:bg-white md:shadow-[0px_0px_4px_#79C5EF] rounded-md min-h-[480px] h-[calc(100vh-8rem)] md:h-full ">
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