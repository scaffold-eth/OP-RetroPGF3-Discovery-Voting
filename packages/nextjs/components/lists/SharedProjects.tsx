import React, { useState } from "react";
import Image from "next/image";
import AddListToBallotModal from "../op/modals/AddListToBallotModal";
import EditDistributionModal from "../op/modals/EditDistributionModal";
import LoadingModal from "../op/modals/LoadingModal";
import SuccessModal from "../op/modals/SuccessModal";
import { AdjustmentsHorizontalIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";
import CustomProjectButton from "~~/components/op/btn/CustomProjectButton";
import { useBallot } from "~~/context/BallotContext";
import { IList } from "~~/types/list";

interface Props {
  list: IList;
}

const SharedProjects: React.FC<Props> = ({ list }) => {
  const { projects, populatedProjects } = list;
  const { dispatch } = useBallot();

  const [editBallot, setEditBallot] = useState(false);
  const [addBallot, setAddBallot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditModal = () => {
    setEditBallot(!editBallot);
  };

  const handleModal = (close = false, edit = false) => {
    setEditBallot(!close && edit);
    setAddBallot(false);
  };
  const addProjectToBallot = () => {
    setAddBallot(false);
    setLoadingMessage("Adding to ballot");
    setSuccessMessage("Projects added successfully");
    setIsLoading(true);
    dispatch({
      type: "ADD_LIST",
      projects: populatedProjects,
    });
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className=" border-[#a2aab6] border-2 rounded-3xl gap-10 grid  px-8 py-10 ">
      <div className="project__header-container min-w-[300px] sm:py-1 ">
        <div className="project__header-container--content">
          <h3 className="text-lg sm:text-2xl font-bold   items-center">
            <span>{projects?.length} Projects -</span>
            <span> {projects?.reduce((sum, p) => sum + p.allocation, 0)} OP Allocated</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomProjectButton
              onClick={handleEditModal}
              text="Edit Distribution"
              customClassName="border-[#d3dde7] py-2 border-2 text-[#4d4f52]"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </CustomProjectButton>

            <CustomProjectButton
              onClick={() => setAddBallot(true)}
              text="Add to Ballot"
              customClassName={`bg-OPred py-2 rounded-lg border-OPred  text-[#ffffff] `}
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
      scrollbar-thumb-[#E2E8F0]"
      >
        {populatedProjects?.map((project, index: number) => (
          <div
            key={index}
            className={`border-[#ccd2db] py-2 ${
              index === populatedProjects.length - 1 ? "" : "border-b-2"
            }  grid grid-flow-col items-center justify-between `}
          >
            <div className={`${!project.name && "items-center"} grid  grid-flow-col gap-4`}>
              <div className={` ${project.name ? "w-[80px]" : "w-[60px]"}`}>
                <Image
                  alt="project list"
                  height={"80"}
                  width={"80"}
                  src={`${project?.profileImageUrl ? project.profileImageUrl : "/assets/gradient-bg.png"}`}
                  className="w-full rounded-xl"
                />
              </div>
              <div className="">
                <h3 className="font-bold text-lg">{project.name}</h3>
                {/* {project.name && <p className="mt-0 text-[1.1rem] text-[#7f97b0]">@{project.handle}</p>} */}
              </div>
            </div>
            <p className="text-lg">{project.allocation} OP</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-base-300 px-5 grid grid-flow-col justify-between items-center">
        <p>Total</p>
        <p>{projects?.reduce((sum, p) => sum + p.allocation, 0)} OP</p>
      </div>

      {addBallot && (
        <AddListToBallotModal
          listName={list.name}
          onClose={() => setAddBallot(false)}
          handleAddBallot={() => addProjectToBallot()}
          projectList={populatedProjects}
          userTotal={projects.reduce((sum, p) => sum + p.allocation, 0)}
          edit={() => handleModal()}
        />
      )}
      {editBallot && <EditDistributionModal list={list} onClose={() => handleModal(false, false)} />}
      {isLoading && <LoadingModal message={loadingMessage} />}
      {isSuccess && <SuccessModal message={successMessage} onClose={() => setIsSuccess(false)} />}
    </div>
  );
};

export default SharedProjects;
