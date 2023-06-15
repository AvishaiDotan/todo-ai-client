import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '@/App'
import HomePage from '@/Pages/HomePage'
import Completed from '@/Pages/Completed'
import Boards from '@/Pages/Boards'
import SharedBoard from '@/Pages/SharedBoard'
import AuthPage from '@/Pages/AuthPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to={'/home'} />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'completed',
        element: <Completed />,
      },
      {
        path: 'boards',
        element: <Boards />,
      },
      {
        path: 'login',
        element: <AuthPage isLoginPage={true} />,
      },
      {
        path: 'register',
        element: <AuthPage isLoginPage={false} />,
      },
      {
        path: 'shared/:boardId',
        element: <SharedBoard />,
      },
    ],
  },
])
