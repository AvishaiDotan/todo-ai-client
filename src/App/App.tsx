import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import './Styles/Setup/typography.scss'
import NavBar from './Components/NavBar'
import { useAppDispatch } from '@/Store'
import { loadUser } from '@/Store/Actions/account.actions'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <main className='mainPage'>
      <NavBar />
      <Outlet></Outlet>
    </main>
  )
}

export default App
