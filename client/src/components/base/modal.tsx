import { useSelector } from "react-redux"
import { RootState } from "../../context/store"
import { Button } from "@mui/material"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { setModal } from "../../context/authSlice"
import { logoutHandler } from "../../services/operation/auth"

const Modal = () => {
    const modal = useSelector((state: RootState) => state.auth.modal)
    const dispatch: Dispatch = useDispatch()

    return (
        <div className={`${modal === true ? 'fixed' : 'hidden'} z-20 flex justify-center items-center md:top-0 top-0 bottom-0 left-0 right-0 bg-[#141414] bg-opacity-45`}>
            <div className="px-5 md:my-0 my-[50%] rounded-md py-4 flex flex-col items-center justify-center mx-auto text-white  bg-themeBlue">
                <h2 className="text-2xl">Are you sure?</h2>
                <div className="flex gap-4 my-5 ">

                    <Button onClick={() => logoutHandler({ dispatch })} sx={{ color: '#6E00FF', bgcolor: '#ffff' }}>Logout</Button>

                    <Button onClick={() => dispatch(setModal())} sx={{ color: '#ffff', borderColor: '#ffff', border: '.5px solid' }}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}
export default Modal