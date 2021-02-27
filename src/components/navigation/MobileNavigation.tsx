import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { BadgeIcon, UsersIcon } from "../icons";

const MobileNavigation: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="mobile-nav">
      <div className="mobile-nav__item">
        <NavLink
          to={`/tasks`}
          className="navigation-nav__item navigation-nav__item-mob"
        >
          <BadgeIcon />
          <span>{t("tasks.title")}</span>
        </NavLink>
      </div>
      <div className="mobile-nav__item">
        <NavLink
          to={`/clients`}
          className="navigation-nav__item navigation-nav__item-mob"
        >
          <UsersIcon />
          <span>{t("clients.title_2")}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNavigation;
