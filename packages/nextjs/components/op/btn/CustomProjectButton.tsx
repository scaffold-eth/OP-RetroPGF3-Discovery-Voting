import React from "react";

interface ICustomProjectButton {
  text: string;
  customClassName?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
const CustomProjectButton: React.FC<ICustomProjectButton> = ({ text, customClassName, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={` grid grid-flow-col items-center   justify-center rounded-xl ${customClassName} `}
    >
      {children}
      <span className={`${children && "pl-2"}`}>{text}</span>
    </button>
  );
};

export default CustomProjectButton;
