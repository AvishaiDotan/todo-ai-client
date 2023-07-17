import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '@/App'
import HomePage from '@/Pages/HomePage'
import CompletedPage from '@/Pages/CompletedPage'
import BoardsPage from '@/Pages/BoardsPage'
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
        element: <CompletedPage />,
      },
      {
        path: 'boards',
        element: <BoardsPage dataToRenderType={DataToRenderTypeEnum.board} title='Boards'/>,
      },
      {
        path: 'boards/:boardId',
        element: <BoardsPage dataToRenderType={DataToRenderTypeEnum.todo} title='Todos'/>,
      },
      {
        path: 'boards/:boardId/todo/:todoId',
        element: <BoardsPage dataToRenderType={DataToRenderTypeEnum.subTask} title='Subtasks' />,
      },
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
