import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface RequestedUser {
    userName: string,
    fullName: string,
    profilePicture: string,
    _id: string,

}


interface NotificationType {
    createdAt: Date | string,
    updatedAt: Date | string,
    isSeen: boolean,
    userId: string,
    userRequested: RequestedUser,
    notificationType: string,
    message: string,
    _id: string

}

interface InitialState {
    notification: NotificationType[]
}

const initialState: InitialState = {
    notification: []
}




const notificationSlice = createSlice({
    name: 'Notification',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<NotificationType[]>) => {
            state.notification = action.payload
        },
        addNotification: (state, action: PayloadAction<NotificationType>) => {
            const findNotification = state.notification.filter((notification) => action.payload._id === notification._id)
            findNotification.length <= 0 && state.notification.push(action.payload)

        }
    }
})

export const{setNotification,addNotification}=notificationSlice.actions

export default notificationSlice.reducer