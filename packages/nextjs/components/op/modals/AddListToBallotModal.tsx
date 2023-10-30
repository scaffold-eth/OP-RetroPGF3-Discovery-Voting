// Import required modules and components
import React from "react";
import { IProjectList } from "../../../types/list";
// Import a custom button component
import CustomProjectButton from "../btn/CustomProjectButton";
import ProjectListCard from "../projects/ProjectListCard";
// Import the BaseModal component
import BaseModal from "./BaseModal";
import { AdjustmentsHorizontalIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";

// Define an interface for the props that VoteModal component receives
interface IAddListToBallotModal {
  onClose: () => void; // A function to be called when the modal is closed
  handleAddBallot: () => void;
  listName: string;
  userTotal: number;
  projectList: IProjectList[];
  edit: () => void;
}

// Define the AddListToBallotModal component as a functional component that receives props of type IAddListToBallotModal
const AddListToBallotModal: React.FC<IAddListToBallotModal> = ({
  onClose,
  handleAddBallot,
  listName,
  userTotal,
  projectList,
  edit,
}) => {
  // Return the JSX code representing the AddListToBallotModal component
  return (
    <BaseModal onClose={onClose}>
      <div className=" w-fit md:w-[600px] lg:w-[800px] bg-secondary rounded-xl p-6">
        <div className="grid gap-6  grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold ">{listName}</h3>
          <button onClick={onClose} className="text-lg btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        <div
          className="max-h-[400px] pr-2 overflow-y-auto 
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-thumb-OPlightgray"
        >
          <ProjectListCard projectData={projectList} />
        </div>
        <div className="mt-4 rounded-2xl bg-base-300 px-5 grid grid-flow-col justify-between items-center">
          <p>Total</p>
          <p>{userTotal.toLocaleString()} OP</p>
        </div>
        <div className="mt-6 grid sm:grid-flow-col gap-3 sm:gap-6">
          <CustomProjectButton
            text="Cancel"
            onClick={onClose}
            customClassName="border-OPlightgray py-2 border-2 text-OPblack"
          >
            {/* <AdjustmentsHorizontalIcon className="w-5 h-5" /> */}
          </CustomProjectButton>

          <CustomProjectButton
            onClick={handleAddBallot}
            text="Add to ballot"
            customClassName="bg-red-600 py-2 rounded-lg border-OPred text-OPwhite"
          >
            <SquaresPlusIcon className="w-5 h-5" />
          </CustomProjectButton>
        </div>
      </div>
    </BaseModal>
  );
};

// Export the AddListToBallotModal component to be used in other parts of the application
export default AddListToBallotModal;
