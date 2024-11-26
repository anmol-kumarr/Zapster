import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the SocketContext type
interface SocketContextType {
    socket: Socket | null; // Socket instance
    isConnected: boolean;  // Connection status
}

// Create the context with an undefined default value
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Create the provider component
export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        // Initialize the socket connection
        const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:4000", {
            autoConnect: false, // Manual connection
        });

        // Establish the connection
        socketInstance.connect();

        // Listen for connection and disconnection events
        socketInstance.on("connect", () => {
            console.log("Socket connected");
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        // Set the socket instance in state
        setSocket(socketInstance);

        // Cleanup on unmount
        return () => {
            socketInstance.disconnect();
            console.log("Socket disconnected on cleanup");
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the SocketContext
export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
