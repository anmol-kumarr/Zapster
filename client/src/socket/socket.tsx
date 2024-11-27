import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./socketEvents";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

interface SocketContextType {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
    isConnected: boolean;
}

// SocketContextType is the type of the context that we will create

// socket is the socket instance that we will use to emit and listen to events


const SocketContext = createContext<SocketContextType | undefined>(undefined);

// createContext creates a context object that we can use to provide the socket instance to the components
// SocketContext is the context object that we will use to provide the socket instance to the components


export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // socketProvider is a component that will provide the socket instance to the components
    // children is the child components that will be wrapped by the SocketProvider component
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    // socket is the socket instance that we will use to emit and listen to events

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

    // isConnected is a boolean that will be true if the socket is connected, otherwise false

    useEffect(() => {
        if (user && isAuthenticated) {

            const socketInstance = io("http://localhost:4000",{
                query:{
                    userId:user?._id
                }
            });

            socketInstance.on("connect", () => {
                setIsConnected(true);
            });

            socketInstance.on("disconnect", () => {
                setIsConnected(false);
            });

            setSocket(socketInstance);

            return () => {
                socketInstance.disconnect();
            };
        }

    }, [isAuthenticated,user]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }
        }>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): SocketContextType => {
    // useSocket is a custom hook that will return the socket instance
    const context = useContext(SocketContext);
    // useContext is a react hook that will return the value of the context object
    

    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    // if the context object is null, then throw an error
    return context;
};
