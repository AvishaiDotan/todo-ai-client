import { NavLink  } from "react-router-dom";
import HomeNavLink from "./HomeNavLink";


export default function NavBar() {
  return (
    <nav className="nav-bar main-font-family">
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
