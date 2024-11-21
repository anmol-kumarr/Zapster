

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

function App() {


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

          <ChatPage></ChatPage>}>

          <Route path='home' element={<Home></Home>}></Route>
          <Route path='chat' element={<ChatSection></ChatSection>}></Route>
          <Route path='notification' element={<Notification></Notification>}></Route>

          <Route path='setting' element={<Setting></Setting>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
