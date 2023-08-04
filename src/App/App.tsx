import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import './Styles/Setup/typography.scss'
import NavBar from './Components/NavBar'
import { useAppDispatch } from '@/Store'
import { loadUser } from '@/Store/Actions/account.actions'
import useScreenWidth from './Hooks/ScreenWidth'

export default function App() {
  const dispatch = useAppDispatch()
  const screenWidth = useScreenWidth()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const noticeStyle: { [key: string]: React.CSSProperties } = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '100px',
      textAlign: 'center',
      backgroundColor: '#2A6350',
      color: 'white',
    },
    header: {
      fontFamily: 'LeagueSpartan-ExtraBold',
    },
  }

  return screenWidth > 1200 ? (
    <main className='mainPage'>
      <NavBar />
      <Outlet />
    </main>
  ) : (
    <div style={noticeStyle.container}>
      <h1 style={noticeStyle.header} className='hey-there'>
        Hey there!
      </h1>
      <span className='third-font-family it-looks'>
        <p>It looks like you're checking out our app on your phone or tablet</p>
        <br />
        <h3
          className='font-black'
          style={{ backgroundColor: '#52A7D7', color: 'black' }}>
          Unfortunately
        </h3>
        <p>
          We're not <span style={{ color: '#F2BE4B' }}>Elon Musk</span>, so we
          don't have the money or time to make this site responsive.
        </p>
      </span>
    </div>
  )
}
