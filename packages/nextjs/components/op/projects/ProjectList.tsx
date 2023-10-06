// TODO: re-enable type checking for file after we wire database to components
// @ts-nocheck
import React, { useState } from "react";
import CustomProjectButton from "../btn/CustomProjectButton";
import AlreadyOnBallotConflictModal from "../modals/AlreadyOnBallotConflictModal";
// import AddListToBallotModal from "../modals/AddListToBallotModal";
import EditDistributionModal from "../modals/EditDistributionModal";
import LoadingModal from "../modals/LoadingModal";
import SuccessModal from "../modals/SuccessModal";
import ProjectListCard from "./ProjectListCard";
import { AdjustmentsHorizontalIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";

export interface IProjectData {
  name: string;
  handle?: string;
  image?: string;
  votes: number;
  id: string;
  listId?: string;
}
const ProjectList = ({ projectData }: { projectData: IProjectData[] }) => {
  const [addBallot, setAddBallot] = useState(false);
  const [editBallot, setEditBallot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userData = { totalOP: 100000 };
  const projectDataHandle = [
    {
      name: "DefiLlama",

      image: "/assets/gradient-bg.png",
      votes: 20416,
    },
    {
      name: "L2BEAT",

      image: "/assets/gradient-bg.png",
      votes: 15416,
    },
    {
      name: "Polynya",

      image: "/assets/gradient-bg.png",
      votes: 12416,
    },
    {
      name: "DefiLlama",

      image: "/assets/gradient-bg.png",
      votes: 20416,
    },
    {
      name: "L2BEAT",

      image: "/assets/gradient-bg.png",
      votes: 15416,
    },
    {
      name: "Polynya",

      image: "/assets/gradient-bg.png",
      votes: 12416,
    },
  ];

  const handleAddBallot = () => {
    setLoadingMessage("Adding selection to ballot");
    setSuccessMessage("Selection added successfully");
    setAddBallot(false);
    setIsLoading(true);
    setTimeout(() => {
      // Spoofed API request to add to ballot
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        // Spoofed response from api
        setIsSuccess(false);
      }, 2000);
    }, 1000);
  };

  const handleSaveBallot = () => {
    setLoadingMessage("Saving distribution");
    setSuccessMessage("Distribution changed successfully");
    setEditBallot(false);
    setIsLoading(true);
    setTimeout(() => {
      // Spoofed API request to save ballot
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        // Spoofed response from api
        setIsSuccess(false);
      }, 2000);
    }, 1000);
  };

  const handleAddOrEditModal = (close: boolean, edit = false) => {
    setEditBallot(!close && edit);
    setAddBallot(!close && !edit);
  };

  return (
    <div className=" border-OPgray border-2 rounded-3xl gap-10 grid  px-8 py-10">
      <div className="project__header-container min-w-[320px]">
        <div className="project__header-container--content">
          <h3 className="text-lg sm:text-2xl font-bold   items-center">
            <span>{projectData.length} projects</span>{" "}
            <span className="text-center rounded-full bg-black w-2 h-2"></span> <span>100k OP allocated</span>
          </h3>
          <div className="grid grid-flow-col gap-3 sm:gap-6">
            <CustomProjectButton
              onClick={() => handleAddOrEditModal(false, true)}
              text="Edit distribution"
              customClassName="border-OPlightgray py-2 border-2 text-OPblack"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </CustomProjectButton>

            <CustomProjectButton
              onClick={() => handleAddOrEditModal(false, false)}
              text="Add to ballot"
              customClassName=" bg-OPred py-2 rounded-lg border-OPred  text-OPwhite"
            >
              <SquaresPlusIcon className="w-5 h-5" />
            </CustomProjectButton>
          </div>
        </div>
      </div>
      <div
        className="max-h-[500px] pr-2 overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-thumb-OPlightgray"
      >
        <ProjectListCard projectData={projectData} />
      </div>
      <div className="rounded-2xl bg-OPoffwhite px-5 grid grid-flow-col justify-between items-center">
        <p>Total</p>
        <p>{userData.totalOP.toLocaleString()} OP</p>
      </div>
      {addBallot && (
        <AlreadyOnBallotConflictModal
          onClose={() => handleAddOrEditModal(true)}
          handleAddBallot={handleAddBallot}
          projectList={projectDataHandle}
          edit={() => handleAddOrEditModal(false, true)}
        />
      )}
      {editBallot && (
        <EditDistributionModal
          onClose={() => handleAddOrEditModal(true)}
          handleSaveBallot={handleSaveBallot}
          userTotal={userData.totalOP}
          projectList={projectDataHandle}
          edit={() => handleAddOrEditModal(false, true)}
        />
      )}
      {isLoading && <LoadingModal message={loadingMessage} />}
      {isSuccess && <SuccessModal message={successMessage} onClose={() => setIsSuccess(false)} />}
    </div>
  );
};

export default ProjectList;
