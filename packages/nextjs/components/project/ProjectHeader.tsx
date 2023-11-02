// TODO add type checking to file by removing next line, reliant on fixing EditDistributionModal
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AddProjectButton from "../op/btn/AddProjectButton";
import LoadingModal from "../op/modals/LoadingModal";
import SuccessModal from "../op/modals/SuccessModal";
import VoteModal from "../op/modals/VoteModal";
import CopyToClipboard from "react-copy-to-clipboard";
import { IconContext } from "react-icons";
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { AdjustmentsHorizontalIcon, DocumentDuplicateIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ArrowUturnRightIcon, CheckCircleIcon, FlagIcon } from "@heroicons/react/24/solid";
import { useBallot } from "~~/context/BallotContext";
import { Project } from "~~/models/Project";
import { isAddedToBallot } from "~~/utils/isAddedToBallot";

// TODO: This component is half-using db and half using stubbed data, need point to db for any stubbed data
const ProjectHeader = ({ project }: { project: Project }) => {
  const handle = project && project.twitterLink ? `@${project.twitterLink.replace("https://twitter.com/", "")}` : "";
  const [addressCopied, setAddressCopied] = useState(false);
  const [editBallot, setEditBallot] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { state, dispatch } = useBallot();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isAllocationError, setIsAllocationError] = useState(false);
  const [prevProjectAllocation] = state.projects.filter(item => item._id === project._id);
  const [newAllocation, setNewAllocation] = useState<number>(prevProjectAllocation?.allocation ?? 0);

  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const toggleEditBallotVote = () => {
    setEditBallot(!editBallot);
  };

  useEffect(() => {
    if (!state) return;
    setIsAdded(false);
    const isProjectInBallot = isAddedToBallot(state, project);
    setIsAdded(isProjectInBallot);
  }, [project, state]);

  const addProjectToBallot = () => {
    const _name = project.name as string;
    setNewAllocation(!Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0);
    dispatch({
      type: "ADD_PROJECT",
      project: {
        _id: project._id,
        name: _name,
        profileImageUrl: project.profileImageUrl,
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
    const currentProjectAllocation = state.projects.find(p => p._id === currentProjectId)?.allocation || 0;
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
    setEditBallot(false);
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
    <div className="mx-auto">
      <div className="max-w-full mx-auto lg:h-[480px] md:h-[350px] sm:h-[250px] rounded-3xl overflow-hidden">
        <Image
          width={1000}
          height={480}
          src={project.bannerImageUrl ? project.bannerImageUrl : "/assets/project/image 3.png"}
          alt="project image"
          className=" w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-4">
        <div className="ml-[30px] flex items-center flex-wrap">
          <div className="mt-[-20px] w-[134px] h-[134px]">
            <Image
              width={134}
              height={134}
              className="rounded-3xl shadow-md w-full h-full bg-white"
              src={project?.profileImageUrl ? project?.profileImageUrl : "/assets/project/image 4.png"}
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
                      toggleEditBallotVote();
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
          <AddProjectButton
            isAdded={isAdded}
            newAllocation={newAllocation}
            setEditBallotVote={setEditBallot}
            customClass="card-btn"
          />
        </div>
      </div>

      {editBallot && (
        <VoteModal
          project={{ allocation: 0, name: project.name, _id: project._id, profileImageUrl: project.profileImageUrl }}
          onClose={() => setEditBallot(false)}
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

export default ProjectHeader;
