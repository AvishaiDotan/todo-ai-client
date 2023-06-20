import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '@/App'
import HomePage from '@/Pages/HomePage'
import Completed from '@/Pages/Completed'
import Boards from '@/Pages/Boards'
import SharedBoard from '@/Pages/SharedBoard'

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
      // {
      //   path: 'boards/:boardId',
      //   element: <Boards title='Todo'/>,
      // },
      // {
      //   path: 'boards/:boardId/Todo/:todoId',
      //   element: <Boards title='Subtasks'/>,
      // },
      {
        path: 'shared/:boardId',
        element: <SharedBoard />,
      },
    ],
  },
])
