import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import HomePage from '../Pages/HomePage'
import Completed from '../Pages/Completed'
import Boards from '../Pages/Boards'

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
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
      ],
    },
  ])