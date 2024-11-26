import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import store from './context/store.ts'
import { SocketProvider } from './socket/socket.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>



      <BrowserRouter>

        <App />
        <Toaster></Toaster>
      </BrowserRouter>

      </SocketProvider>
    </Provider>
  </StrictMode>,
)
