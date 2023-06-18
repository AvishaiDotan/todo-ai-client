import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsPower } from 'react-icons/bs'
import { VscLoading } from 'react-icons/vsc'

import HomeNavLink from './HomeNavLink'
import { useAppDispatch, useAppSelector } from '@/Store'
import { logoutUser } from '@/Store/Actions/account.actions'

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
        <>
          <a className='active no-underline'>{`${firstNameInitial}.${lastNameInitial}`}</a>
          <button
            type='button'
            onClick={handleLogout}
            className='shadow-2xl	transition duration-300 rounded p-1 self-center bg-red-500 text-white hover:text-red-500 hover:bg-stone-50'>
            {isLogginOut ? (
              <VscLoading className='text-2xl animate-spin fill-white-600' />
            ) : (
              <BsPower className='text-2xl' />
            )}
          </button>
        </>
      )
    }

    return <NavLink to='/login'>Login</NavLink>
  }, [user, isLogginOut])

  return (
    <nav className='nav-bar main-font-family'>
      <div>
        <NavLink to='/home'>
          <HomeNavLink />
        </NavLink>
      </div>
      <div className='gap-x-4 flex link-animation'>
        <NavLink to='/boards'>Boards</NavLink>

        <NavLink to='/completed'>Completed</NavLink>

        {authLinks}
      </div>
    </nav>
  )
}

// type NavLinkArgs = {
//   isActive: boolean
//   isPending: boolean
// }

// function getLinkClass(props: NavLinkArgs): string {
//   return props.isPending ? 'pending' : props.isActive ? 'active' : ''
// }

// Was used like
{
  /* <NavLink to='/completed' className={getLinkClass}>Completed</NavLink> */
}
