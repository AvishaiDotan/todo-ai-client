import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '@/App'
import HomePage from '@/Pages/HomePage'
import Completed from '@/Pages/Completed'
import Boards from '@/Pages/Boards'
import SharedBoard from '@/Pages/SharedBoard'
import AuthPage from '@/Pages/AuthPage'

import { DataToRenderTypeEnum } from '@/Types'

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
        element: <Boards dataToRenderType={DataToRenderTypeEnum.board} title='Boards'/>,
      },
      {
        path: 'boards/:boardId',
        element: <Boards dataToRenderType={DataToRenderTypeEnum.todo} title='Todos'/>,
      },
      // {
      //   path: 'boards/:boardId/Todo/:todoId',
      //   element: <Boards title='Subtasks'/>,
      // },
      {
        path: 'login',
        element: <AuthPage isLoginPage={true} />,
      },
      {
        path: 'signup',
        element: <AuthPage isLoginPage={false} />,
      },
      {
        path: 'shared/:boardId',
        element: <SharedBoard />,
      },
    ],
  },
])
