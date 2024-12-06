import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface RequestedUser {
    userName: string,
    fullName: string,
    profilePicture: string,
    _id: string,

}


export interface NotificationType {
    createdAt: Date | string,
    updatedAt: Date | string,
    isSeen: boolean,
    userId: string,
    userRequested: RequestedUser,
    notificationType: string,
    message: string,
    _id: string,
    __v?: number

}


interface InitialState {
    notification: NotificationType[],
    friendRequest: string[],
    requestSent: string[]
}



const initialState: InitialState = {
    notification: [],
    friendRequest: [],
    requestSent: []
}




const notificationSlice = createSlice({
    name: 'Notification',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<InitialState>) => {
            if (state?.friendRequest?.length === 0 && state?.notification?.length === 0 && state?.requestSent?.length === 0) {
                state.friendRequest = action.payload.friendRequest,
                    state.notification = action.payload.notification,
                    state.requestSent = action.payload.requestSent
            }
        },
        pushNotification: (state, action) => {
            state.notification.push(action.payload)
        },
        addNotification: (state, action: PayloadAction<NotificationType>) => {
            const findNotification = state.notification.filter((notification) => action.payload._id === notification._id)
            findNotification.length <= 0 && state.notification.push(action.payload)

        },
        addFriendRequest: (state, action) => {
            state.friendRequest = action.payload
        },
        addRequestSent: (state, action) => {
            state.requestSent = action.payload
        },
        addOneRequestSend: (state, action) => {
            const findDuplicate = state.notification.filter((notification) => notification._id === action.payload)
            findDuplicate.length <= 0 && state.requestSent.push(action.payload)
        },
        deleteNotification: (state, action) => {
            state.notification = state.notification.filter((notification) => notification._id !== action.payload)
        },
        removeFriendRequest: (state, action) => {
            state.friendRequest = state.friendRequest.filter((request) => request !== action.payload)
        },
        removeRequestSent: (state, action) => {
            state.requestSent = state.requestSent.filter((sent) => sent !== action.payload)
        }

    }
})

export const {
    setData,
    addNotification,
    addFriendRequest,
    addRequestSent,
    addOneRequestSend,
    pushNotification,
    removeFriendRequest,
    removeRequestSent,
    deleteNotification





} = notificationSlice.actions

export default notificationSlice.reducer