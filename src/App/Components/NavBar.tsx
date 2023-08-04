import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'
import { VscLoading } from 'react-icons/vsc'

import HomeNavLink from './HomeNavLink'
import { useAppDispatch, useAppSelector } from '@/Store'
import { logoutUser } from '@/Store/Actions/account.actions'

import { PageRoute } from '@/Types'
import usePageRouteHook from '@/Hooks/PageRoute'

export default function NavBar() {
  const [isLogginOut, setIsLogginOut] = useState(false)

  const user = useAppSelector(({ account }) => account.loggedUser)
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      setIsLogginOut(true)
      await dispatch(logoutUser())
    } catch (error) {
      console.log(error)
    } finally {
      setIsLogginOut(false)
    }
  }

  const authLinks = useMemo(() => {
    // First Name letter and Last Name letter, example: 'John Smith' -> J.S
    if (user) {
      const names = user.fullName.split(' ')
      const firstNameInitial = names[0][0].toUpperCase()
      const lastNameInitial = names[1][0].toUpperCase()

      return (
        <div className='flex gap-2'>
          <span className='inline-block self-center text-primary bg-secondary rounded-full p-1 pt-[7px]'>{`${firstNameInitial}${lastNameInitial}`}</span>
          <button
            type='button'
            onClick={handleLogout}
            className='shadow-2xl	transition duration-300 rounded p-1 self-center bg-slate-700 bg-opacity-50 text-white hover:text-slate-700 hover:bg-stone-50'>
            {isLogginOut ? (
              <VscLoading className='text-2xl animate-spin fill-white-600' />
            ) : (
              <LuLogOut className='text-2xl' />
            )}
          </button>
        </div>
      )
    }

    return <NavLink to='/login'>Login</NavLink>
  }, [user, isLogginOut])

  const route = usePageRouteHook()
  const getClassByRoute = (route: PageRoute) => {
    switch (route) {
      case PageRoute.boards:
        return 'boards'
      case PageRoute.home:
        return 'home'
      case PageRoute.completed:
        return 'completed'
      case PageRoute.todos:
        return 'todos'
      case PageRoute.login:
        return 'login'
      case PageRoute.signup:
        return 'signup'
      default:
        return 'home'
    }
  }

  return (
    <nav className={`nav-bar main-font-family ${getClassByRoute(route)}`}>
      <div>
        <NavLink to='/home'>
          <HomeNavLink />
        </NavLink>
      </div>
      <div className='gap-x-4 flex link-animation'>
        <NavLink to='/boards'>Boards</NavLink>

        {/* <NavLink to='/completed'>Completed</NavLink> */}

        {authLinks}
      </div>
    </nav>
  )
}
