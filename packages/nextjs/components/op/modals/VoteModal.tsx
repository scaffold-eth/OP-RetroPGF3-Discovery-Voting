// Import required modules and components
import React, { useEffect, useRef } from "react";
import Image from "next/image";
// Import Image component from Next.js to display images efficiently
import CustomProjectButton from "../btn/CustomProjectButton";
// Import a custom button component
import BaseModal from "./BaseModal";
import { ProjectState, useBallot } from "~~/context/BallotContext";

// Import the BaseModal component

// Define an interface for the props that VoteModal component receives
interface IVoteModal {

  project: {
    _id: string;
    name: string;
    allocation: number;
    profileImageUrl?: string;
  }; // The project to be voted on

  handleAllocationChange: (value: any) => void;
  onClose: () => void; // A function to be called when the modal is closed
  handleAddBallot: () => void;
  allocation: string | number;
  isAllocationError: boolean;
}

// Define the VoteModal component as a functional component that receives props of type IVoteModal
const VoteModal: React.FC<IVoteModal> = ({
  project,
  handleAllocationChange,
  onClose,
  handleAddBallot,
  allocation,
  isAllocationError,
}) => {
  // Return the JSX code representing the VoteModal component
  const { state } = useBallot();
  const allocationInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!allocationInputRef) return;
    // focus on input when modal opens
    allocationInputRef.current?.focus();
  }, [allocationInputRef]);

  return (
    <BaseModal onClose={onClose}>
      {" "}
      {/* Render the BaseModal component and pass the onClose prop */}
      <div className="max-w-[400px] bg-base-100 rounded-xl p-6">
        <div className="grid gap-6 grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold ">Vote</h3>
          {/* Render a button with an onClick event that calls the onClose function */}
          <button onClick={onClose} className="text-lg text-OPgray btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        {isAllocationError ? (
          <p className="bg-warning text-warning-content text-xs p-2">
            Total allocated OP exceeds your available tokens of {state.totalTokens} OP, allocation have been
            automatically adjusted
          </p>
        ) : (
          <p className="text-OPgray text-sm">
            All the data will be saved locally on this browser until you finalize your vote.
          </p>
        )}

        <div className="rounded-xl p-1 bg-secondary mb-3 items-center grid justify-start grid-flow-col gap-4">
          <div className="w-[50px]">
            {/* Render an Image component to display an image related to the project */}
            <Image
              alt="project list"
              height={"80"}
              width={"80"}
              src={`${project?.profileImageUrl ? project.profileImageUrl : "/assets/gradient-bg.png"}`}
              className="w-full rounded-xl"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg ">{project?.name}</h3> {/* Display the project name */}
          </div>
        </div>
        <div className="mb-5 border-OPoffwhite border-2 rounded-xl pr-4 overflow-hidden py-0 grid grid-flow-col justify-between items-center ">
          <input
            ref={allocationInputRef}
            onChange={e => handleAllocationChange(e.target.value)}
            className="border-none bg-transparent outline-none p-3 w-full  "
            value={allocation}
          />{" "}
          {/* Display the number of votes */}
          <p className="font-bold h-full m-0 border-OPoffwhite border-l-2 py-2 pl-4">OP</p> {/* Display a label */}
        </div>

        <div className="w-full">
          {/* Render a custom button to add the project to the ballot */}
          <CustomProjectButton
            onClick={handleAddBallot}
            text="Save" // Button text
            customClassName="bg-OPred py-4 rounded-lg border-OPred w-full text-white"
          ></CustomProjectButton>
        </div>
      </div>
    </BaseModal>
  );
};

// Export the VoteModal component to be used in other parts of the application
export default VoteModal;
