import * as React from "react";
import { PlusIcon } from "../icons/PlusIcon";

import './index.scss'

type AddButtonProps = {
  onClick: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <div className="add-btn" onClick={onClick}>
      <PlusIcon />
    </div>
  );
};

export default AddButton;
