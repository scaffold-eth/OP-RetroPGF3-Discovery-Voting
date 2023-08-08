// Import required modules and components
import React from "react";
import Image from "next/image";
// Import Image component from Next.js to display images efficiently
import CustomProjectButton from "../btn/CustomProjectButton";
// Import a custom button component
import BaseModal from "./BaseModal";

// Import the BaseModal component

// Define an interface for the props that VoteModal component receives
interface IVoteModal {
  onClose: () => void; // A function to be called when the modal is closed
  handleAddBallot: () => void;
}

// Define the VoteModal component as a functional component that receives props of type IVoteModal
const VoteModal: React.FC<IVoteModal> = ({ onClose, handleAddBallot }) => {
  // Return the JSX code representing the VoteModal component
  return (
    <BaseModal onClose={onClose}>
      {" "}
      {/* Render the BaseModal component and pass the onClose prop */}
      <div className="max-w-[400px] bg-white rounded-xl p-6">
        <div className="grid gap-6 grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold ">vote</h3>
          {/* Render a button with an onClick event that calls the onClose function */}
          <button onClick={onClose} className="text-lg text-OPgray btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        <p className="text-OPgray text-sm">
          All the data will be saved locally on this browser until you finalize your vote.
        </p>

        <div className="rounded-xl p-1 bg-OPoffwhite mb-3 items-center grid justify-start grid-flow-col gap-4">
          <div className="w-[50px]">
            {/* Render an Image component to display an image related to the project */}
            <Image
              alt="project list"
              height={"80"}
              width={"80"}
              src="/assets/gradient-bg.png"
              className="w-full rounded-xl"
            />
          </div>
          <div className="">
            <h3 className="font-bold text-lg">Polynya</h3> {/* Display the project name */}
          </div>
        </div>
        <div className="mb-5 border-OPoffwhite border-2 rounded-xl px-4 py-0 grid grid-flow-col justify-between items-center">
          <p className="m-0 py-2">35,416</p> {/* Display the number of votes */}
          <p className="font-bold h-full m-0 border-OPoffwhite border-l-2 py-2 pl-4">OP</p> {/* Display a label */}
        </div>

        <div className="w-full">
          {/* Render a custom button to add the project to the ballot */}
          <CustomProjectButton
            onClick={handleAddBallot}
            text="Save" // Button text
            customClassName="bg-OPred py-4 rounded-lg border-OPred w-full text-OPwhite"
          ></CustomProjectButton>
        </div>
      </div>
    </BaseModal>
  );
};

// Export the VoteModal component to be used in other parts of the application
export default VoteModal;
