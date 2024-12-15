import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import SignUp from './pages/signUp'
import OpenRoutes from './routes/openRoutes'
import ChatPage from './pages/chatPage'
import Home from './components/home/home'
import ChatSection from './components/chats/chatSection'
import Notification from './components/notification/notification'
// import Setting from './components/settings/setting'
import HomePage from './pages/homePage'
import { useEffect } from 'react'
import CloseRoute from './routes/closeRoute'
import { useMediaQuery } from 'usehooks-ts'
import SearchSection from './components/search/searchSection'
import SearchProfile from './components/chats/searchProfile'
import { useSocket } from './socket/socket'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { addMessage, addSingleFriend } from './context/chatSlice'
// import ChatBox from './components/chats/chatBox'
import MobileChatPage from './components/chats/mobileChatPage'
import { pushNotification } from './context/notifications'
import Modal from './components/base/modal'

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

  const { socket, isConnected } = useSocket()
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {


    socket?.on('receiveMessage', (data) => {
      console.log(data)
      dispatch(addMessage(data))
    })

    socket?.on("friendRequestReceive", (data) => {
      console.log(data)
      dispatch(pushNotification(data?.notifications[0]))
    })

    socket?.on('friendAdded', (data) => {
      console.log(data)
      dispatch(addSingleFriend(data))

    })
    socket?.on('requestAccepted', (data) => {
      console.log(data)
      dispatch(addSingleFriend(data?.addFriend))
      dispatch(pushNotification(data?.updateFriend
        ?.notifications[0]))

    })

  }, [isConnected, socket])

  const width = useMediaQuery('(min-width: 768px)')
  // useEffect(() => {
  // console.log(width)
  // },[matches])






  return (
    <div className='relative'>
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

        {/* <Route path='/user' element={
          <CloseRoute>

            <ChatPage></ChatPage>
          </CloseRoute>
        }> */}


        <Route path='/user' element={
          <CloseRoute>
            <ChatPage></ChatPage>
          </CloseRoute>
        }>



          <Route
            path='home'
            element={<Home></Home>}
          ></Route>



          {width ? (
            <>
              <Route path="chat" element={<ChatSection />} />
              <Route path="chat/:userId" element={<ChatSection />} />
            </>
          ) : (
            <>
              <Route path="chat" element={<ChatSection />} />
              <Route path="chat/:userId" element={<MobileChatPage></MobileChatPage>} />
            </>
          )}





          <Route
            path='notification'
            element={<Notification></Notification>}
          ></Route>

          {/* <Route
            path='setting'
            element={<Setting></Setting>}
          ></Route> */}

          <Route
            path='search'>

            <Route
              path=''
              element={<SearchSection></SearchSection>}>

              <Route
                path=':userId'
                element={<SearchProfile></SearchProfile>}
              ></Route>
            </Route>

          </Route>
        </Route>
      </Routes>
      <div>
        <Modal></Modal>
      </div>
    </div>
  )
}

export default App
