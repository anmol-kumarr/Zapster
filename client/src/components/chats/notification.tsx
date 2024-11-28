import React from 'react'
import NotificationImage from '../../assets/notification.svg'



const Notification: React.FC = () => {
    return (
        <div className='w-full h-full flex'>
            <div className='w-2/5 bg-white shadow-[0px_0px_3px_#e2ccff] rounded-md'>
                <div className='border-b-[0.5px] py-3 border-textGrey'>

                    <h2 className='text-center text-lg font-inter font-semibold text-textBlack'>Notifications</h2>
                </div>
                <div>

                </div>
            </div>
            <div className='w-3/5 flex justify-center items-center '>
                <img className='h-full w-full' src={NotificationImage} alt="" />
            </div>
        </div>
    )
}

export default Notification