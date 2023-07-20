import { createBrowserRouter, Navigate } from 'react-router-dom'

import App from '@/App'
import HomePage from '@/Pages/HomePage'
import CompletedPage from '@/Pages/CompletedPage'
import BoardsPage from '@/Pages/BoardsPage'
import AuthPage from '@/Pages/AuthPage'
import TodosPage from '@/Pages/TodosPage'
import SubtaskPage from '@/Pages/SubtaskPage'
import E404Page from '@/Pages/E404Page'

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
        element: <BoardsPage />,
      },
      {
        path: 'boards/:boardId',
        element: <TodosPage />,
      },
      {
        path: 'boards/:boardId/subtasks/:todoId',
        element: <SubtaskPage />,
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
        path: '*',
        element: <E404Page />,
      },
    ],
  },
])
