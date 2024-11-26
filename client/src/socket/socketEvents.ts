import { Message } from "../context/chatSlice";

// socketEvents.ts
export interface ClientToServerEvents {
    sendMessage: (data: { message: string; userId: string }) => void;
    typing: (data: { isTyping: boolean }) => void;
}

export interface ServerToClientEvents {
    receiveMessage: (data: Message) => void;
    notification: (data: { title: string; body: string }) => void;
}
