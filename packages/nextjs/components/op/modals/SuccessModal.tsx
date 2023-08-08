// Import required modules and components
import React from "react";
import BaseModal from "./BaseModal";
// Import the BaseModal component
import { ShieldCheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

// Import icons from the Heroicons library

// Define an interface for the props that SuccessModal component receives
interface ISuccessModal {
  message: string; // The success message to be displayed in the modal
  onClose: () => void; // A function to be called when the modal is closed
}

// Define the SuccessModal component as a functional component that receives props of type ISuccessModal
const SuccessModal: React.FC<ISuccessModal> = ({ message, onClose }) => {
  // Return the JSX code representing the SuccessModal component
  return (
    <BaseModal onClose={onClose}>
      {" "}
      {/* Render the BaseModal component and pass the onClose prop */}
      <div className="relative w-fit md:w-[400px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-6">
        {/* Render an XMarkIcon with an onClick event that calls the onClose function */}
        <XMarkIcon onClick={onClose} className="w-6 h-6 cursor-pointer absolute right-4 top-4" />
        <div className="p-2 w-fit rounded-xl bg-OPlightgreen">
          <ShieldCheckIcon className="w-8 h-8 text-OPdarkgreen" /> {/* Render a ShieldCheckIcon */}
        </div>
        <h3 className="text-lg font-bold ">{message}</h3> {/* Render the success message */}
      </div>
    </BaseModal>
  );
};

// Export the SuccessModal component to be used in other parts of the application
export default SuccessModal;
