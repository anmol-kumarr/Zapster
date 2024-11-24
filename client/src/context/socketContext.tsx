import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "./store"
import { io, Socket } from "socket.io-client"

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL
const socketUrl = VITE_SOCKET_URL

interface SocketContextType {
    socket: Socket,
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)




export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const [isConnected, setIsConnected] = useState<boolean>(false)

    const socket = io(socketUrl, {
        autoConnect: false,
        query: {
            userId:user?._id
        }
    })

    useEffect(() => {



        if (isAuthenticated && user) {

            // socket.connect()
            // socket.on('connect', () => {
            //     console.log('Socket is connected')
            //     setIsConnected(true)
            // })


            // socket.on('disconnect', () => {
            //     console.log('socket is disconnected')
            //     setIsConnected(false)
            // })

            // return () => {
            //     socket.disconnect()
            // }
        }
    }, [isAuthenticated, user])


    return (
        <SocketContext.Provider value={{ socket, isConnected }
        }>
            {children}
        </SocketContext.Provider>
    );

}


export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};