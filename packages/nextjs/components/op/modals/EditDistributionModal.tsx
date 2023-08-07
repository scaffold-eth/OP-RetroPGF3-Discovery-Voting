// Import required modules and components
import React, { useState } from "react";
// Import a custom button component
import CustomProjectButton from "../btn/CustomProjectButton";
import { IProjectData } from "../projects/ProjectList";
import ProjectListCardEditable from "../projects/ProjectListCardEditable";
// Import the BaseModal component
import BaseModal from "./BaseModal";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

// Define an interface for the props that VoteModal component receives
interface IEditDistributionModal {
  onClose: () => void; // A function to be called when the modal is closed
  handleSaveBallot: () => void;
  userTotal: number;
  projectList: IProjectData[];
  edit: () => void;
}

// Define the EditDistributionModal component as a functional component that receives props of type IEditDistributionModal
const EditDistributionModal: React.FC<IEditDistributionModal> = ({
  onClose,
  handleSaveBallot,
  userTotal,
  projectList,
  edit,
}) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const checkTotal = (total: number) => {
    // Check if total is under maximum
    const difference = userTotal - total;
    if (difference < 0) {
      // Show Error if it is
      setShowError(true);
      setErrorMessage(`Total exceeds by ${Math.abs(difference).toLocaleString()} OP`);
    }
  };

  const resetDistribution = () => {
    console.log("reset");
  };
  // Return the JSX code representing the EditDistributionModal component
  return (
    <BaseModal onClose={onClose}>
      <div className=" w-fit md:w-[600px] lg:w-[800px] bg-white rounded-xl p-6">
        <div className="grid gap-6  grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold ">Edit distribution</h3>
          <button onClick={onClose} className="text-lg btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        <CustomProjectButton
          text="Reset distribution"
          onClick={resetDistribution}
          customClassName="text-primary bg-secondary border-none shadow-none"
        >
          <ArrowPathIcon className="h-3 w-3" />
        </CustomProjectButton>
        <div
          className="max-h-[400px] pr-2 overflow-y-auto 
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-thumb-OPlightgray"
        >
          <ProjectListCardEditable projectData={projectList} emitTotal={checkTotal} />
        </div>
        {showError ? (
          <div className="mt-4 rounded-2xl bg-warning text-warning-content px-5 grid grid-flow-col justify-between items-center">
            <p>{errorMessage}</p>
            <p>{userTotal.toLocaleString()} OP</p>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-OPoffwhite px-5 grid grid-flow-col justify-between items-center">
            <p>Total</p>
            <p>{userTotal.toLocaleString()} OP</p>
          </div>
        )}
        <div className="mt-6 grid sm:grid-flow-col gap-3 sm:gap-6">
          <CustomProjectButton
            text="Cancel"
            onClick={edit}
            customClassName="border-OPlightgray py-2 border-2 text-OPblack"
          />

          <CustomProjectButton
            onClick={handleSaveBallot}
            text="Save"
            customClassName={"bg-OPred py-2 rounded-lg border-OPred  text-OPwhite" + showError ? " btn-disabled" : ""}
            disabled={showError}
          />
        </div>
      </div>
    </BaseModal>
  );
};

// Export the EditDistributionModal component to be used in other parts of the application
export default EditDistributionModal;
