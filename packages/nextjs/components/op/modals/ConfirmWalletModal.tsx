// Import required modules and components
import React from "react";
import BaseModal from "./BaseModal";
// Import the BaseModal component
import { WalletIcon, XMarkIcon } from "@heroicons/react/20/solid";

// Import icons from the Heroicons library

// Define an interface for the props that ConfirmWalletModal component receives
interface IConfirmWalletModal {
  message: string; // The main message to be displayed in the modal
  details?: string; // Optional additional details to be displayed in the modal
  onClose: () => void; // A function to be called when the modal is closed
}

// Define the ConfirmWalletModal component as a functional component that receives props of type IConfirmWalletModal
const ConfirmWalletModal: React.FC<IConfirmWalletModal> = ({ message, onClose, details }) => {
  // Return the JSX code representing the ConfirmWalletModal component
  return (
    <BaseModal onClose={onClose}>
      {" "}
      {/* Render the BaseModal component and pass the onClose prop */}
      <div className="relative text-center max-w-[500px] md:w-[500px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-8">
        {/* Render an XMarkIcon with an onClick event that calls the onClose function */}
        <XMarkIcon onClick={onClose} className="w-8 h-8 text-[#a2aab6] cursor-pointer absolute right-6 top-6" />
        <div className="p-2 w-fit rounded-xl bg-[#a2aab6]">
          <WalletIcon className="w-8 h-8 " /> {/* Render a WalletIcon */}
        </div>
        <h3 className="text-lg font-bold mb-0">{message}</h3> {/* Render the main message */}
        {details && <p className="mt-0 text-[#a2aab6]">{details}</p>} {/* Render additional details if provided */}
      </div>
    </BaseModal>
  );
};

// Export the ConfirmWalletModal component to be used in other parts of the application
export default ConfirmWalletModal;
