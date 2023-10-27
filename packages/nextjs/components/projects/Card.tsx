import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddProjectButton from "../op/btn/AddProjectButton";
import LoadingModal from "../op/modals/LoadingModal";
import SuccessModal from "../op/modals/SuccessModal";
import VoteModal from "../op/modals/VoteModal";
import { Project, useBallot } from "~~/context/BallotContext";
import logo from "~~/public/assets/Logo.png";
import { isAddedToBallot } from "~~/utils/isAddedToBallot";

// import banner from "~~/public/assets/gradient-bg.png";

const Card = ({ project, display }: { project: Project; display: any }) => {
  const { name, ownerName, bio, impactCategory, bannerImageUrl, profileImageUrl } = project;

  const [isAdded, setIsAdded] = useState(false);
  const { state, dispatch } = useBallot();
  const [editBallotVote, setEditBallotVote] = useState(false);
  const [isAllocationError, setIsAllocationError] = useState(false);

  const [prevProjectAllocation] = state.projects.filter(item => item._id === project._id);
  const [newAllocation, setNewAllocation] = useState<number>(prevProjectAllocation?.allocation ?? 0);

  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toggleInitialized, setToggleInitialized] = useState<boolean | undefined>(undefined);
  const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);
  useEffect(() => {
    if (!state) return;
    setIsAdded(false);
    const isProjectInBallot = isAddedToBallot(state, project);
    setIsAdded(isProjectInBallot);
  }, [project, state]);

  // useEffect(() => {
  //   if (toggleEditModal === undefined) return;
  //   if (toggleInitialized) {
  //     setEditBallotVote(true);
  //   }
  //   setToggleInitialized(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [toggleEditModal]);

  const addProjectToBallot = () => {
    const _name = project.name as string;
    setNewAllocation(!Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0);
    dispatch({
      type: "ADD_PROJECT",
      project: {
        id: project._id,
        name: _name,
        allocation: !Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0,
      },
    });
  };

  const handleAllocationChange = (value: any) => {
    setIsAllocationError(false);
    let currentTotalAllocation = state.projects.reduce((sum, p) => sum + p.allocation, 0);
    const currentProjectId = project._id;
    // Ensure value is a number
    value = Number(value);

    if (isNaN(value)) {
      value = Number.isNaN(newAllocation) ? 0 : newAllocation;
    }

    // Deduct the current project's allocation, since we're editing it
    const currentProjectAllocation = state.projects.find(p => p.id === currentProjectId)?.allocation || 0;
    currentTotalAllocation -= currentProjectAllocation;

    const projectedTotal = value + currentTotalAllocation;

    if (projectedTotal > state.totalTokens) {
      value = state.totalTokens - currentTotalAllocation;
      setIsAllocationError(true);
    }

    setNewAllocation(value);
  };

  const handleAddBallot = () => {
    let message = "Saving distribution";
    let completedMessage = "Distribution changed successfully";
    if (!isAdded) {
      message = "Adding project to ballot";
      completedMessage = "Successfully added project";
      addProjectToBallot();
    } else {
      dispatch({
        type: "UPDATE_ALLOCATION",
        projectId: project._id,
        newAllocation,
      });
    }
    setLoadingMessage(message);
    setEditBallotVote(false);
    setIsLoading(true);
    // using setTimeout on loading and success modals for better UX
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 1000);
    setSuccessMessage(completedMessage);
  };

  return (
    <div>
      {display === "grids" ? (
        <div className="project__card-container rounded-[1.5em] p-2 bg-base-100 border-gray-300 border ">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <Link href={`/projects/${project._id}`} className="truncate">
              {bannerImageUrl ? (
                <div className="max-h-[112px] rounded-[1.05em] overflow-hidden">
                  <Image
                    width={311}
                    height={112}
                    className="rounded-[1.05em] object-contain object-center w-full h-full"
                    src={bannerImageUrl}
                    alt="banner"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-full h-[112px] rounded-[1.05em] bg-gray-300"></div>
              )}

              <Image
                width={54}
                height={54}
                className="mt-[-22px] object-contain ml-[20px] border-4 w-[54px] h-[54px] bg-white border-white  rounded-[1.05em] inline-block   "
                src={profileImageUrl ? profileImageUrl : logo}
                alt="logo"
              />
            </Link>
          </div>

          <div className="flex items-center">
            <div className="flex-1 truncate">
              <Link href={`/projects/${project._id}`} className="truncate">
                <p className="truncate text-[18px] font-bold leading-[28px] mb-0 mt-2">{name}</p>
              </Link>
              <div className="flex items-center">
                <p className="font-semibold leading-[0px]  text-sm  ">{ownerName}</p>
              </div>
            </div>
          </div>

          <p className="text-lightGray text-[14px] font-normal leading-5  mt-0 truncate">{bio}</p>
          <div className=" project__card-container_btn py-2">
            <span className="px-2 py-1 text-[0.75rem] text-base-content-100 bg-base-200 rounded-md mr-2">
              {" "}
              {impactCategory[0]}
            </span>
            <AddProjectButton
              isAdded={isAdded}
              newAllocation={newAllocation}
              setEditBallotVote={setEditBallotVote}
              customClass="card-btn "
            />
          </div>
        </div>
      ) : (
        <div className="flex border rounded-[1.5rem] border-gray-300   p-4 ">
          <Link href={`/projects/${project._id}`} className="truncate">
            <Image
              width={74}
              height={74}
              className="border-4 border-white  bg-white rounded inline-block w-[74px] h-[74px] object-contain "
              src={profileImageUrl ? profileImageUrl : logo}
              alt="logo"
            />
          </Link>
          <div className="ml-6 w-full">
            <Link href={`/projects/${project._id}`} className="truncate">
              <p className="text-[18px] font-bold leading-[28px] mb-0 mt-0">{name}</p>
              <p className="text-lightGray text-[14px] font-normal leading-5 my-0 ">{bio} Web3 Explorer</p>
            </Link>
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-1 ">
              <Link href={`/projects/${project._id}`} className="truncate">
                <span className="w-fit px-2 py-1 text-sm text-customGray bg-customWhite rounded-md mr-2">
                  {" "}
                  {impactCategory[0]}
                </span>
              </Link>
              <div className="w-fit">
                <AddProjectButton
                  isAdded={isAdded}
                  newAllocation={newAllocation}
                  setEditBallotVote={setEditBallotVote}
                  customClass="card-btn"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {editBallotVote && (
        <VoteModal
          project={project}
          onClose={() => setEditBallotVote(false)}
          allocation={newAllocation}
          handleAddBallot={() => handleAddBallot()}
          handleAllocationChange={handleAllocationChange}
          isAllocationError={isAllocationError}
        />
      )}
      {isLoading && <LoadingModal message={loadingMessage} />}
      {isSuccess && <SuccessModal message={successMessage} onClose={() => setIsSuccess(false)} />}
    </div>
  );
};

export default Card;
