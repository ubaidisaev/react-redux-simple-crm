import * as React from "react";

import "./index.scss";

export type ButtonColor =
  | "black-white"
  | "red-white"
  | "white-black"
  | "lred-white"
  | "transparent-black"
  | "lgrey-black"
  | "lblack-white"
  | "grey-white"
  | "green-white"
  | "vk-blue"
  | "jagged-ice"
  | "half-baked"
  | "inline-black"
  | "inline-red"
  | "inline-dred"
  | "inline-blue";

interface IButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  customClassName?: string;
  size?: "small" | "normal" | "medium" | "large";
  color?: ButtonColor;
  width?: "auto" | "full";
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    onClick,
    disabled = false,
    width = "full",
    customClassName = "",
    size = "normal",
    color = "black-white",
  } = props;
  let className = "btn";

  if (size !== "normal") {
    className += ` btn_${size}`;
  }

  if (disabled) {
    className += " btn_disabled";
  }

  if (customClassName) {
    className += ` ${customClassName}`;
  }

  if (width === "auto") {
    className += " btn_w-auto";
  }

  if (color !== "black-white") {
    className += ` btn_${color}`;
  } else {
    className += ` btn_black-white`;
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
