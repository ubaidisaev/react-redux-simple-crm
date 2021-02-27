import * as React from "react";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

import "./index.scss";

const Navigation: React.FC = () => {
  return (
    <header>
      <DesktopNavigation />
      <MobileNavigation />
    </header>
  );
};

export default Navigation;
