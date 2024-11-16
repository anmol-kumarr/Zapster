

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import SignUp from './pages/signUp'
import OpenRoutes from './routes/openRoutes'
import ChatPage from './pages/chatPage'

function App() {


  return (
    <div>
      <Routes>
        <Route path='/'
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
        </Route>
      </Routes>
    </div>
  )
}

export default App
