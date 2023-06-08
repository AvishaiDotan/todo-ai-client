import { Outlet } from 'react-router-dom'
import NavBar from './Components/NavBar'
import './Styles/Setup/typography.scss'

function App() {
  return (
    <main className='mainPage'>
      <NavBar />
      <Outlet></Outlet>
    </main>
  )
}

export default App
