

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'

function App() {


  return (
    <div>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
        </Routes>
    </div>
  )
}

export default App
