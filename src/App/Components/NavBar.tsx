import { NavLink  } from "react-router-dom";
import HomeNavLink from "./HomeNavLink";

import { PageRoute } from '@/Types';
import PageRouteHook from '../Hooks/BoardHooks/PageRouteHook'

export default function NavBar() {

  const route = PageRouteHook();
  const getClassByRoute = (route: PageRoute) => {
      switch (route) {
          case PageRoute.boards:
              return "boards";
          case PageRoute.home:
              return "home";
          case PageRoute.completed:
              return "completed";
          case PageRoute.shared: 
              return "shared";
          case PageRoute.todos:
              return "todos";
          default:
              return "home"
      }
  }

  return (
    <nav className={`nav-bar main-font-family ${getClassByRoute(route)}`}>
      <div>
        <NavLink
              to="/home"
              className={getLinkClass}
        >
          <HomeNavLink />
        </NavLink>
      </div>
      <div className="gap-x-4 flex link-animation">
        <NavLink
            to="/boards"
            className={getLinkClass}>
            Boards
        </NavLink>

        <NavLink
            to="/completed"
            className={getLinkClass}>
            Completed
        </NavLink>
      </div>


    </nav>
  )
}

function getLinkClass(props: NavLinkArgs): string {
    
    return props.isPending ? "pending" : props.isActive ? "active" : ""
  }

type NavLinkArgs = {
    isActive: boolean;
    isPending: boolean;
};
