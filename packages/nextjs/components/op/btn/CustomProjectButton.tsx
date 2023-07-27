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
      className={` grid grid-flow-col items-center p-2  justify-center rounded-lg ${customClassName} `}
    >
      {children}
      <span className="pl-2">{text}</span>
    </button>
  );
};

export default CustomProjectButton;
