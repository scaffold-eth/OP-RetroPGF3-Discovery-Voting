import React from "react";

// Define an interface for the props that BaseModal component receives
interface IBaseModal {
  onClose: () => void; // A function to be called when the modal is closed
  children: React.ReactNode; // The content to be rendered inside the modal
}

// Define the BaseModal component as a functional component that receives props of type IBaseModal
const BaseModal: React.FC<IBaseModal> = ({ onClose, children }) => {
  // Define a function to handle the click event when the user clicks on the modal
  const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is an HTMLDivElement and if it has the specific id "custom-modal-dialog"
    if (e.target instanceof HTMLDivElement && e.target.id === "custom-modal-dialog") {
      // If the conditions are met, call the onClose function to close the modal
      onClose();
    }
  };

  // Return the JSX code representing the BaseModal component
  return (
    <div
      id="custom-modal-dialog" // Assign the id "custom-modal-dialog" to the main div of the modal
      onClick={handleOnClose} // Attach the handleOnClose function to the onClick event of the main div
      className="fixed inset-0 px-4 bg-black bg-opacity-30 backdrop-blur-sm grid justify-center items-center"
    >
      {children} {/* Render the content passed as children inside the modal */}
    </div>
  );
};

// Export the BaseModal component to be used in other parts of the application
export default BaseModal;
