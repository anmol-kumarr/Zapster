// socketEvents.ts
export interface ClientToServerEvents {
    sendMessage: (data: { message: string; userId: string }) => void;
    typing: (data: { isTyping: boolean }) => void;
}

export interface ServerToClientEvents {
    receiveMessage: (data: { message: string; userId: string }) => void;
    notification: (data: { title: string; body: string }) => void;
}
