import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "./authSlice";



interface Message {
    senderId: string,
    receiverId: string,
    content: string
}

interface Conversation {
    participants: [string, string],
    messages: Message[],
    friendId: string

}


interface ConversationPayload {
    participants: [string, string],
    message: Message,
    friendId: string
}



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
        addConversation: (state, action: PayloadAction<ConversationPayload>) => {
            state.conversations.forEach(conversation => {
                if (conversation.friendId === action.payload.friendId) {
                    conversation.messages.push(action.payload.message)
                }
                
            });
        }

    }
})


export const { addFriends } = chatSlice.actions

export default chatSlice.reducer