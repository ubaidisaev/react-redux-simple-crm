import * as React from "react";

import "./index.scss";

interface ICheckboxProps {
  labelClassName?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  let labelClassName = "checkbox";

  const {checked, onChange} = props;

  if (checked) {
    labelClassName += " checkbox_checked";
  }

  return (
    <label onClick={handleClick} className={labelClassName}>
      <input
        className="checkbox__input"
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
    </label>
  );

  function handleClick(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
    event.stopPropagation();
  }
};

export default Checkbox;
