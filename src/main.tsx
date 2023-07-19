import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { router } from './App/Router'
import { store } from './App/Store'

// Disable auto freezer to enable sortablejs works well
import { setAutoFreeze } from 'immer'
setAutoFreeze(false)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
