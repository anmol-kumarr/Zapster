import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Auth = {
    userName: string,
    fullName: string,
    token?: string,
    gender?: string,
    profilePicture: string,
    password?: null,
    _id?: string
}

interface InitialState {
    isAuthenticated: boolean,
    user: Auth | null,
    modal: boolean
}

const initialState: InitialState = {
    isAuthenticated: localStorage.getItem('zapster') ? true : false,
    user: localStorage.getItem('zapster') ? JSON.parse(localStorage.getItem('zapster')!) : null,
    modal: false

}

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<Auth>) => {
            state.isAuthenticated = true,
                state.user = action.payload
        },
        setLogout: (state) => {
            state.isAuthenticated = false,
                state.user = null
        },
        setModal: (state) => {
            state.modal = !state.modal
        }
    }

})


export const { setIsAuthenticated, setLogout,setModal } = authSlice.actions
export default authSlice.reducer