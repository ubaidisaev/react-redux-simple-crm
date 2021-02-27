import * as React from "react";

import ClientSearch from "./ClientSearch";
import AddButton from "@/components/add-button/AddButton";
import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher";

interface IClientNavProps {
  handleClick: () => void;
}

const ClientNav: React.FC<IClientNavProps> = (props) => {

  return (
    <div className="header-page-nav">
      <div className="header-page-nav__col">
        <LanguageSwitcher />
      </div>
      <div className="header-page-nav__col">
        <ClientSearch />
      </div>
      <div className="header-page-nav__col">
        <AddButton onClick={props.handleClick} />
      </div>
    </div>
  );
};

export default ClientNav;
