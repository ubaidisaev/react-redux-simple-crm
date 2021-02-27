import * as React from "react";
import { NavLink } from "react-router-dom";
import { BadgeIcon, HomeIcon, UsersIcon } from "@/components/icons";

const DesktopNavigation: React.FC = () => {
  return (
    <div className="navigation">
      <div className="navigation-logo">
        <NavLink to="/" className="navigation-logo__link">
          <HomeIcon color="#222" width="40px" />
        </NavLink>
      </div>
      <nav className="navigation-nav navigation-nav_main">
        <NavLink to={`/tasks`} className="navigation-nav__item">
          <BadgeIcon width="35px" />
        </NavLink>
        <NavLink to={`/clients`} className="navigation-nav__item">
          <UsersIcon width="35px" />
        </NavLink>
      </nav>
    </div>
  );
};

export default DesktopNavigation;
