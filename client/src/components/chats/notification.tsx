import React from 'react'
import NotificationImage from '../../assets/notification.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../context/store'
import { FriendRequest, RequestAccept } from './notificationBox'



const Notification: React.FC = () => {
    const notification = useSelector((state: RootState) => state.notification.notification)
    return (
        <div className='w-full h-full flex'>
            <div className='md:w-2/5 w-full bg-white shadow-[0px_0px_3px_#e2ccff] rounded-md'>
                <div className='border-b-[0.5px] py-3 border-textGrey'>

                    <h2 className='text-center text-lg font-inter font-semibold text-textBlack'>Notifications</h2>
                </div>
                <div className='overflow-y-scroll h-[calc(100vh-4.4rem)] md:h-[calc(100vh-5.5rem)] md:py-2'>


                    {
                        notification.map((notification) => (
                            <>
                                {

                                    notification.notificationType === 'Request' && (
                                        <FriendRequest key={notification._id} notification={notification}></FriendRequest>
                                    )
                                }
                                {

                                    notification.notificationType === 'Accept' && (<RequestAccept notification={notification}></RequestAccept>)
                                }
                            </>
                            // {

                            //     notification.notificationType === 'Group'
                            // }
                        ))
                    }

                </div>




            </div>
            <div className='hidden  w-3/5 md:flex justify-center items-center '>
                <img className='h-full w-full' src={NotificationImage} alt="" />
            </div>
        </div>
    )
}

export default Notification