// Import required modules and components
import React from "react";
// Import a custom button component
import CustomProjectButton from "../btn/CustomProjectButton";
import { IProjectData } from "../projects/ProjectList";
import ProjectListCardEditable from "../projects/ProjectListCardEditable";
// Import the BaseModal component
import BaseModal from "./BaseModal";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// Define an interface for the props that VoteModal component receives
interface IAlreadyOnBallotConflictModal {
  onClose: () => void; // A function to be called when the modal is closed
  handleAddBallot: () => void;
  projectList: IProjectData[];
  edit: () => void;
}

// Define the AlreadyOnBallotConflictModal component as a functional component that receives props of type IAlreadyOnBallotConflictModal
const AlreadyOnBallotConflictModal: React.FC<IAlreadyOnBallotConflictModal> = ({
  onClose,
  handleAddBallot,
  projectList,
  edit,
}) => {
  // Return the JSX code representing the AlreadyOnBallotConflictModal component
  return (
    <BaseModal onClose={onClose}>
      <div className=" w-fit md:w-[600px] lg:w-[800px] bg-secondary rounded-xl p-6">
        <div className="grid gap-6  grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold ">Add Solarpunk Utopia Dream to your ballot</h3>
          <button onClick={onClose} className="text-lg btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        <div className="alert alert-warning text-warning-content justify-start items-start">
          <ExclamationCircleIcon className="w-5 h-5 mt-0.5" />
          <div className="flex flex-col items-start">
            <b>3 projects in your list already exist in your ballot.</b>{" "}
            <p className="m-0">
              You can choose to use the list&apos;s OP allocation or keep your original OP allocation.
            </p>
          </div>
        </div>
        <div className="mt-2 border-b-2 border-OPlightgray flex flex-rox text-OPdarkgray text-sm">
          <span className="w-[49%]">Project</span>
          <span className="w-[22%]">List allocation</span>
          <span className="">Your allocation</span>
        </div>
        <div
          className="max-h-[400px] pr-2 overflow-y-auto 
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-thumb-OPlightgray"
        >
          <ProjectListCardEditable
            listAllocation={projectList}
            projectData={projectList}
            emitTotal={function (total: number): void {
              total;
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="mt-6 grid sm:grid-flow-col gap-3 sm:gap-6">
          <CustomProjectButton
            text="Cancel"
            onClick={edit}
            customClassName="border-OPlightgray py-2 border-2 text-OPblack"
          />

          <CustomProjectButton
            onClick={handleAddBallot}
            text="Continue"
            customClassName=" bg-OPred py-2 rounded-lg border-OPred  text-OPwhite"
          />
        </div>
      </div>
    </BaseModal>
  );
};

// Export the AlreadyOnBallotConflictModal component to be used in other parts of the application
export default AlreadyOnBallotConflictModal;
