import * as React from "react";
import AddButton from "@/components/add-button/AddButton";
import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher";
import TaskSearch from "./TaskSearch";

import './index.scss'

type TasksNavProps = {
  onClick: () => void;
};

const TasksNav: React.FC<TasksNavProps> = ({ onClick }) => {
  return (
    <div className="tasks-nav header-page-nav">
      <div className="header-page-nav__col">
        <LanguageSwitcher />
      </div>
      <div className="header-page-nav__col">
        <TaskSearch />
      </div>
      <div className="header-page-nav__col">
        <AddButton onClick={onClick} />
      </div>
    </div>
  );
};

export default TasksNav;
