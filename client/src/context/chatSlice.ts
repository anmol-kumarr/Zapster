import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "./authSlice";



export interface Message {
    senderId: string,
    receiverId: string,
    conversation: string
    content: string,
    updatedAt: string | Date,
    createdAt: string | Date,
    _id: string
}
export interface Meta{
    totalMessages:number,
    currentPage:number,
    totalPages:number,
    perPage:number


}
export interface Conversation {
    participants: [string, string],
    messages: Message[],
    friendId: string,
    updatedAt?: string | Date,
    createdAt?: string | Date,
    _id?: string,
    __v?: number,
    meta?:Meta
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

            const findConversation = state.conversations.filter((conversation) => conversation._id === action.payload._id)
            if (findConversation.length <= 0) {
                state.conversations.push(action.payload)
            }

        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.conversations = state.conversations.map((conversation) => {
                // If the conversation ID matches, add the new message

                const findMessage = conversation.messages.filter(message => message._id === action.payload._id)
                if (findMessage.length <= 0) {

                    if (conversation._id === action.payload.conversation) {
                        return {
                            ...conversation,
                            messages: [...conversation.messages, action.payload],
                        };
                    }
                }

                return conversation;
            })

        },
        addPaginationMessage: (state, action: PayloadAction<Conversation>) => {
            state.conversations = state.conversations.map((conversation) => {
                if (conversation._id === action.payload._id) {
                    return {
                        ...conversation,
                        messages: [...action.payload.messages, ...conversation.messages],
                        meta: action.payload.meta
                    }
                }
                else {
                    return conversation
                }
            })

        }
    }
})


export const { addFriends, addConversation, addMessage, addPaginationMessage } = chatSlice.actions

export default chatSlice.reducer