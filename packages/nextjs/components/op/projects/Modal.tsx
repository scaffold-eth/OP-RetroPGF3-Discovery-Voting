import React from "react";

interface IModal {
  onClose: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<IModal> = ({ onClose, children }) => {
  const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "custom-modal-dialog") {
      onClose();
    }
  };

  return (
    <div
      id="custom-modal-dialog"
      onClick={handleOnClose}
      className="fixed inset-0 px-4 bg-black bg-opacity-30 backdrop-blur-sm grid justify-center items-center"
    >
      {children}
    </div>
  );
};

export default Modal;
