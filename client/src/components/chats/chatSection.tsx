import GroupSection from "./groupSection"
import UserBar from "./userBar"

const ChatSection = () => {
    return (
        <div className="flex">
            <div className="w-[25%]">
                <GroupSection></GroupSection>
            </div>
            <div>

                <UserBar></UserBar>
            </div>
        </div>
    )
}
export default ChatSection