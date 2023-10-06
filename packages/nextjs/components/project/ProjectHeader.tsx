// TODO add type checking to file by removing next line, reliant on fixing EditDistributionModal
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import AlreadyOnBallotConflictModal from "../op/modals/AlreadyOnBallotConflictModal";
// import EditDistributionModal from "../op/modals/EditDistributionModal";
import LoadingModal from "../op/modals/LoadingModal";
import SuccessModal from "../op/modals/SuccessModal";
import VoteModal from "../op/modals/VoteModal";
import CopyToClipboard from "react-copy-to-clipboard";
import { IconContext } from "react-icons";
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import {
  AdjustmentsHorizontalIcon,
  DocumentDuplicateIcon,
  EllipsisHorizontalIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { ArrowUturnRightIcon, CheckBadgeIcon, CheckCircleIcon, FlagIcon } from "@heroicons/react/24/solid";
import { useBallot } from "~~/context/BallotContext";
import { ProjectDocument } from "~~/models/Project";
import { notification } from "~~/utils/scaffold-eth";

// TODO: This component is half-using db and half using stubbed data, need point to db for any stubbed data
const ProjectHeader = ({ project }: { project: ProjectDocument }) => {
  const handle = project && project.twitterLink ? `@${project.twitterLink.replace("https://twitter.com/", "")}` : "";
  // const [addVote, setAddVote] = useState(false);
  const _project = project;
  const [addressCopied, setAddressCopied] = useState(false);
  // const [addBallot, setAddBallot] = useState(false);
  const [editBallotVote, setEditBallotVote] = useState(false);
  // const [editBallot, setEditBallot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isAllocationError, setIsAllocationError] = useState(false);
  const { state, dispatch } = useBallot();
  const [prevProjectAllocation] = state.projects.filter(project => project.id === _project._id);
  const [newAllocation, setNewAllocation] = useState<number>(prevProjectAllocation?.allocation ?? 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addProjectToBallot = () => {
    const _name = project.name as string;
    setNewAllocation(!Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0);
    dispatch({
      type: "ADD_PROJECT",
      project: {
        id: project._id,
        name: _name,
        category: project.category,
        allocation: !Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0,
      },
    });
    notification.success("Added to ballot");
  };

  const handleAllocationChange = value => {
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

  const handleEditBallot = () => {
    let message = "Saving distribution";
    let completedMessage = "Distribution changed successfully";
    if (!isAdded) {
      addProjectToBallot();
      message = "Adding project to ballot";
      completedMessage = "Successfully added project";
    }
    setLoadingMessage(message);
    dispatch({
      type: "UPDATE_ALLOCATION",
      projectId: project._id,
      newAllocation,
    });
    setEditBallotVote(false);
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
    setSuccessMessage(completedMessage);
  };

  // const handleAddOrEditModal = (close: boolean, edit = false) => {
  //   setEditBallot(!close && edit);
  //   setAddBallot(!close && !edit);
  // };

  useEffect(() => {
    if (!state) return;
    setIsAdded(false);
    const isAddedToBallot = () => {
      state.projects.forEach((x: any) => {
        if (x.id === project._id) setIsAdded(true);
      });
    };
    isAddedToBallot();
  }, [project, state]);

  return (
    <div className="mx-auto">
      <div className="max-w-full mx-auto">
        <Image
          width={1000}
          height={1000}
          src="/assets/project/image 3.png"
          alt="project image"
          className="block w-full"
        />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-4">
        <div className="ml-[30px] flex items-center flex-wrap">
          <div className="mt-[-20px] max-w-[134px] w-full h-[134px]">
            <Image
              width={500}
              height={500}
              className=" w-full  rounded-lg shadow-md  "
              src="/assets/project/image 4.png"
              alt="project image"
            />
          </div>
          <div className="ml-[20px] mt-[-50px] flex-wrap">
            <h1 className="pt-20 font-semibold sm:text-xl md:text-2xl  lg:text-4xl  leading-11">{project.name}</h1>
            <div className="flex justify-between flex-wrap">
              <>
                <div className="flex items-center gap-8 flex-wrap">
                  <a
                    href="#"
                    className="bg-gradient-to-r from-primary to-purple inline-block text-transparent bg-clip-text"
                  >
                    {handle}
                  </a>

                  {addressCopied ? (
                    <CheckCircleIcon
                      className="text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer ml-[6px]"
                      aria-hidden="true"
                    />
                  ) : (
                    <CopyToClipboard
                      text={handle}
                      onCopy={() => {
                        setAddressCopied(true);
                        setTimeout(() => {
                          setAddressCopied(false);
                        }, 800);
                      }}
                    >
                      <DocumentDuplicateIcon
                        className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                        aria-hidden="true"
                      />
                    </CopyToClipboard>
                  )}

                  <div className="h-[18px] border-l-2 border-neutral  mx-[6px] "></div>
                  <a href={project.twitterLink} target="_blank" rel="noreferrer">
                    <IconContext.Provider value={{ color: "twitterBlue", className: "h-7 w-7 " }}>
                      <AiOutlineTwitter />
                    </IconContext.Provider>
                  </a>
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    <IconContext.Provider value={{ className: "h-6 w-6 " }}>
                      <AiOutlineGithub />
                    </IconContext.Provider>
                  </a>
                  <a href={project.websiteUrl} target="_blank" rel="noreferrer">
                    <IconContext.Provider value={{ className: "h-6 w-6 " }}>
                      <BsGlobe />
                    </IconContext.Provider>
                  </a>
                </div>
              </>
            </div>
          </div>
        </div>

        <div className="relative flex md:self-end">
          <div className="dropdown" ref={dropdownRef}>
            <label
              tabIndex={0}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer py-2 px-2 rounded-md flex border border-gray-200 mr-4"
            >
              <EllipsisHorizontalIcon className="font-semibold  h-10 w-10 text-neutral-content" />
            </label>
            {isDropdownOpen && (
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-secondary rounded-xl rounded-box w-52">
                {isAdded && (
                  <li
                    onClickCapture={() => {
                      setEditBallotVote(true);
                      setIsDropdownOpen(false);
                    }}
                    className="cursor-pointer flex flex-row items-center"
                  >
                    <div className="w-full py-0">
                      <AdjustmentsHorizontalIcon className="w-6 h-6 text-OPdarkgray" />
                      <p className="text-OPdarkgray">Edit Distribution</p>
                    </div>
                  </li>
                )}
                <li className="cursor-pointer flex flex-row items-center">
                  <div className="w-full py-0">
                    <ArrowUturnRightIcon className="w-6 h-6 text-OPdarkgray" />
                    <p className="text-OPdarkgray">Share</p>
                  </div>
                </li>
                <li className="cursor-pointer flex flex-row items-center">
                  <div className="w-full py-0">
                    <FlagIcon className="w-6 h-6  text-OPdarkgray" />
                    <p className="text-OPdarkgray">Report</p>
                  </div>
                </li>
              </ul>
            )}
          </div>

          <button
            onClick={() => {
              setEditBallotVote(true);
            }}
            className={`rounded-lg flex items-center py-2 px-4 xl:px-8 whitespace-nowrap ${
              isAdded ? "border-gray-200 text-primary border-2 whitespace-nowrap bg-base-100" : "bg-primary text-white"
            }`}
          >
            {isAdded ? (
              <CheckBadgeIcon className=" font-semibold  h-6 w-6 text-primary mr-4" />
            ) : (
              <FolderIcon className=" font-semibold  h-6 w-6 text-white mr-4" />
            )}
            {isAdded && newAllocation > 0
              ? `${newAllocation} OP allocated`
              : isAdded && !newAllocation
              ? "0 OP allocated"
              : "Add to Ballot"}
          </button>

          {editBallotVote && (
            <VoteModal
              project={project}
              onClose={() => setEditBallotVote(false)}
              allocation={newAllocation}
              handleAddBallot={() => handleEditBallot()}
              handleAllocationChange={handleAllocationChange}
              isAllocationError={isAllocationError}
            />
          )}
          {/*should be removed, not needed*/}
          {/* {addBallot && (
            <AlreadyOnBallotConflictModal
              onClose={() => handleAddOrEditModal(true)}
              handleAddBallot={handleAddBallot}
              projectList={projectDataHandle}
              edit={() => handleAddOrEditModal(false, true)}
            />
          )} */}
          {/* TODO: should be removed, no longer needed */}
          {/* {editBallot && (
            <EditDistributionModal
              onClose={() => handleAddOrEditModal(true)}
              userTotal={userData.totalOP}
              projectList={projectDataHandle}
              edit={() => handleAddOrEditModal(false, true)}
            />
          )} */}
          {isLoading && <LoadingModal message={loadingMessage} />}
          {isSuccess && <SuccessModal message={successMessage} onClose={() => setIsSuccess(false)} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
