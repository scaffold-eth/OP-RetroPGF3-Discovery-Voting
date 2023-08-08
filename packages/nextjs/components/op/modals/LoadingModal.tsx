// Import required modules and components
import React from "react";
import BaseModal from "./BaseModal";

// Import the BaseModal component

// Define an interface for the props that LoadingModal component receives
interface ILoadingModal {
  message: string; // The message to be displayed in the loading modal
}

// Define the LoadingModal component as a functional component that receives props of type ILoadingModal
const LoadingModal: React.FC<ILoadingModal> = ({ message }) => {
  // Return the JSX code representing the LoadingModal component
  return (
    <BaseModal
      onClose={() => {
        console.log("working"); // This function logs "working" to the console when the modal is closed
      }}
    >
      <div className="w-fit md:w-[400px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-6">
        <div className="p-3 w-12 h-12 rounded-xl bg-OPlightblue">
          {/* Render a loading spinner with the class "loading-lg" and the text color "text-info" */}
          <div
            className="w-full h-full rounded-full animate-spin
                    border-4 border-solid border-OPblue border-t-transparent"
          ></div>
        </div>
        <h3 className="text-lg font-bold ">{message}</h3> {/* Render the loading message */}
      </div>
    </BaseModal>
  );
};

// Export the LoadingModal component to be used in other parts of the application
export default LoadingModal;
