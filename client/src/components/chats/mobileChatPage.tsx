import ChatBox from "./chatBox"
import UserBar from "./userBar"

const MobileChatPage = () => {

    const element = document.querySelector('#mobileChatPage') as HTMLDivElement | null;
    function adjustHeight() {
        if (element) {

            element.style.height = `${window.innerHeight - 4 *32 }px`
        } else {

        }
    }

    window.addEventListener('resize', adjustHeight);
    adjustHeight();
    return (
        <div id="mobileChatPage" >
            <UserBar></UserBar>
            
            <ChatBox></ChatBox>
        </div>
    )

}
export default MobileChatPage