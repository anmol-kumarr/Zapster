import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://zapster.onrender.com"; // Backend URL

// Define the event types for strict typing
interface ServerToClientEvents {
    reply: (message: string) => void;
}

interface ClientToServerEvents {
    sendMessage: (message: string) => void;
}

// Create and export the socket instance
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

export default socket;
