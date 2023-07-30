import React from "react";

interface ICustomProjectButton {
  text: string;
  customClassName?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
const CustomProjectButton: React.FC<ICustomProjectButton> = ({
  text,
  customClassName,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={` grid grid-flow-col items-center   justify-center rounded-xl ${customClassName} `}
      disabled={disabled}
    >
      {children}
      <span className={`${children && "pl-2"}`}>{text}</span>
    </button>
  );
};

export default CustomProjectButton;
