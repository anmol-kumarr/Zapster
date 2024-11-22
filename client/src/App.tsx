

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import SignUp from './pages/signUp'
import OpenRoutes from './routes/openRoutes'
import ChatPage from './pages/chatPage'
import Home from './components/chats/home'
import ChatSection from './components/chats/chatSection'
import Notification from './components/chats/notification'
import Setting from './components/chats/setting'
import HomePage from './pages/homePage'
import { useEffect } from 'react'
import CloseRoute from './routes/closeRoute'
import socketConnection from './services/operation/socket'
import useSocketConnection from './services/operation/socket'
import SearchSection from './components/chats/searchSection'
import SearchProfile from './components/chats/searchProfile'

interface AuthValue {
  userName: string,
  fullName: string,
  token?: string,
  gender?: string,
  profileImage: string,
  password?: null,
  validUpto?: Date
}
function App() {



  useEffect(() => {
    const authValue: AuthValue = JSON.parse(localStorage.getItem('zapster') || '{}')



    if (authValue.validUpto && new Date(authValue.validUpto) < new Date()) {
      localStorage.removeItem('zapster')
    }


  }, [])
  useSocketConnection()




  return (
    <div>
      <Routes>
        <Route path='/'
          element={
            <HomePage></HomePage>
          }>
        </Route>


        <Route path='/login'
          element={
            <OpenRoutes>
              <Login></Login>
            </OpenRoutes>
          }>
        </Route>




        <Route
          path='/signUp'
          element={
            <OpenRoutes>
              <SignUp></SignUp>
            </OpenRoutes>
          }>
        </Route>

        <Route path='/user' element={
          <CloseRoute>

            <ChatPage></ChatPage>
          </CloseRoute>
        }>

          <Route path='home' element={<Home></Home>}></Route>
          <Route path='chat' element={<ChatSection></ChatSection>}></Route>
          <Route path='notification' element={<Notification></Notification>}></Route>

          <Route path='setting' element={<Setting></Setting>}></Route>

          <Route path='search'>

            <Route path='' element={<SearchSection></SearchSection>}>
              <Route path=':userId' element={<SearchProfile></SearchProfile>}></Route>
            </Route>

          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
