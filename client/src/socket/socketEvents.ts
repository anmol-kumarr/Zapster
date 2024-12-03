import { Message } from "../context/chatSlice";

// socketEvents.ts
export interface ClientToServerEvents {
    sendMessage: (data: { message: string; userId: string }) => void;
    typing: (data: { isTyping: boolean }) => void;
    sendNotification:(data:{message:string,userId:string,friendId:string})=>void
}



// sendMessage and typing are the events that the client can emit to the server


export interface ServerToClientEvents {
    receiveMessage: (data: Message) => void;
    notification: (data: { title: string; body: string }) => void;
    friendRequestReceive:(data:any)=>void
}


// receiveMessage and notification are the events that the server can emit to the client