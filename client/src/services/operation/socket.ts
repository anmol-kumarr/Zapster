import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { RootState } from "../../context/store";

const useSocketConnection = () => {

    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

    // useEffect(() => {
    //     if (isAuthenticated && user) {
    //         console.log(user)

    //     //     const socket: Socket = io('http://localhost:4000', {
    //     //         query: {
    //     //             userId: user._id
    //     //         }
    //     //     })





    //     //     return () => {
    //     //         socket.close()
    //     //         socket.disconnect()
    //     //     }
    //     // }
        


    // }, [isAuthenticated, user])
    return null
}

export default useSocketConnection