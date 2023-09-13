// TODO add type checking to file by removing next line, reliant on fixing EditDistributionModal
// @ts-nocheck
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AlreadyOnBallotConflictModal from "../op/modals/AlreadyOnBallotConflictModal";
import EditDistributionModal from "../op/modals/EditDistributionModal";
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
import { ArrowUturnRightIcon, CheckCircleIcon, FlagIcon } from "@heroicons/react/24/solid";
import { useBallot } from "~~/context/BallotContext";
import { ProjectDocument } from "~~/models/Project";
import { notification } from "~~/utils/scaffold-eth";

// TODO: This component is half-using db and half using stubbed data, need point to db for any stubbed data
const ProjectHeader = ({ project }: { project: ProjectDocument }) => {
  const handle = project && project.twitterLink ? `@${project.twitterLink.replace("https://twitter.com/", "")}` : "";
  const [addVote, setAddVote] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [openLikedModal, setopenLikedModal] = useState(false);
  // const [voteAmount, setVoteAmount] = useState(0);
  const [addBallot, setAddBallot] = useState(false);
  const [editBallot, setEditBallot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userData = { totalOP: 100000 };
  const [isAdded, setIsAdded] = useState(false);
  const { state, dispatch } = useBallot();

  const projectDataHandle = [
    {
      name: "DefiLlama",

      image: "/assets/gradient-bg.png",
      op: 20416,
    },
    {
      name: "L2BEAT",

      image: "/assets/gradient-bg.png",
      op: 15416,
    },
    {
      name: "Polynya",

      image: "/assets/gradient-bg.png",
      op: 12416,
    },
    {
      name: "DefiLlama",

      image: "/assets/gradient-bg.png",
      op: 20416,
    },
    {
      name: "L2BEAT",

      image: "/assets/gradient-bg.png",
      op: 15416,
    },
    {
      name: "Polynya",

      image: "/assets/gradient-bg.png",
      op: 12416,
    },
  ];
  console.log(project);

  const addProjectToBallot = () => {
    const _name = project.name as string;
    dispatch({
      type: "ADD_PROJECT",
      project: {
        id: project._id,
        name: _name,
        allocation: 0,
      },
    });
    notification.success("Added to ballot");
  };

  const handleSaveBallot = () => {
    // TODO: Need to save input data to state
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

      <div className="flex justify-between">
        <div className="ml-[30px] flex items-center flex-wrap">
          <Image
            width={500}
            height={500}
            className=" mt-[-20px] w-[134px] h-[134px] rounded-lg shadow-md  "
            src="/assets/project/image 4.png"
            alt="project image"
          />
          <div className="ml-[20px] mt-[-50px] flex-wrap">
            <h1 className="pt-20 font-semibold sm:text-xl md:text-2xl  lg:text-4xl  leading-11">{project.name}</h1>
            <div className="flex justify-between flex-wrap">
              <>
                <div className="flex items-center gap-8 flex-wrap">
                  <a
                    href="#"
                    className="bg-gradient-to-r from-OPred to-purple inline-block text-transparent bg-clip-text"
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

        <div className="relative flex self-end">
          <button
            onClick={() => {
              setopenLikedModal(!openLikedModal);
            }}
            className="py-2 px-2 rounded-md flex border border-neutral mr-4"
          >
            <EllipsisHorizontalIcon className="font-semibold  h-10 w-10 text-neutral-content" />
          </button>

          {openLikedModal && (
            <div className="absolute  bg-white rounded-xl top-16 -left-0 sm:right-0 py-3 px-8  border-[1px] border-OPoffwhite">
              <button onClickCapture={() => setAddVote(true)} className="flex gap-4 items-center">
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-OPdarkgray" />
                <p onClick={() => handleSaveBallot()}>Edit Distribution</p>
              </button>
              <button className="flex gap-4 items-center">
                <ArrowUturnRightIcon className="w-6 h-6 text-OPdarkgray" />
                <p>Share</p>
              </button>
              <button className="flex gap-4 items-center">
                <FlagIcon className="w-6 h-6 text-OPdarkgray" />
                <p>Report</p>
              </button>
            </div>
          )}

          <button
            onClick={() => addProjectToBallot()}
            disabled={isAdded}
            className="rounded-lg flex  items-center   bg-OPred text-white py-2 px-4 xl:px-8"
          >
            <FolderIcon className=" font-semibold  h-10 w-10 text-white mr-4" />
            {isAdded ? "Added to ballot" : "Add to Ballot"}
          </button>

          {addVote && <VoteModal onClose={() => setAddVote(false)} handleAddBallot={() => handleSaveBallot()} />}

          {addBallot && (
            <AlreadyOnBallotConflictModal
              onClose={() => handleAddOrEditModal(true)}
              handleAddBallot={handleAddBallot}
              projectList={projectDataHandle}
              edit={() => handleAddOrEditModal(false, true)}
            />
          )}
          {/* TODO: Fix this EditDistributionModal */}
          {editBallot && (
            <EditDistributionModal
              onClose={() => handleAddOrEditModal(true)}
              userTotal={userData.totalOP}
              projectList={projectDataHandle}
              edit={() => handleAddOrEditModal(false, true)}
            />
          )}
          {isLoading && <LoadingModal message={loadingMessage} />}
          {isSuccess && <SuccessModal message={successMessage} onClose={() => setIsSuccess(false)} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
