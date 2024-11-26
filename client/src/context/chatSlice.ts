import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "./authSlice";



export interface Message {
    senderId: string,
    receiverId: string,
    conversation: string
    content: string,
    updatedAt: string,
    createdAt: string,
    _id: string
}

interface Conversation {
    participants: [string, string],
    messages: Message[],
    friendId: string,
    updatedAt?: string,
    createdAt?: string,
    _id?: string,
    __v?: number
}


// interface ConversationPayload {
//     participants: [string, string],
//     message: Message,
//     friendId: string
// }



interface Chat {
    friends: Auth[],
    conversations: Conversation[]
}

const initialState: Chat = {
    friends: [],
    conversations: []
}

const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        addFriends: (state, action: PayloadAction<Auth[]>) => {
            state.friends = action.payload
        },
        addConversation: (state, action: PayloadAction<Conversation>) => {


            state.conversations.push(action.payload)
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            const findOne = state.conversations.find(
                (conversation) => conversation._id === action.payload.conversation
            );

            if (findOne) {
                
                findOne.messages.push(action.payload);
            }
        }

    }
})


export const { addFriends, addConversation,addMessage } = chatSlice.actions

export default chatSlice.reducer