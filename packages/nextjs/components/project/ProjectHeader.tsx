import React, { useState } from "react";
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

export const ProjectHeader = () => {
  const handle = "@orbiter_finance";
  const [addVote, setAddVote] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [openLikedModal, setopenLikedModal] = useState(false);
  const [voteAmount, setVoteAmount] = useState("");
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

  const handleAddBallot = () => {
    setLoadingMessage("Adding to ballot");
    setSuccessMessage("Selection added successfully");
    setAddBallot(false);
    setIsLoading(true);
    setAddVote(false);
    setVoteAmount("35,416");
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
            <h1 className="pt-20 font-semibold sm:text-xl md:text-2xl  lg:text-4xl  leading-11">Orbiter Finance</h1>

            <div className="flex justify-between flex-wrap">
              <>
                <div className="flex items-center gap-8 flex-wrap">
                  <a
                    href="#"
                    className="bg-gradient-to-r from-[#FF0420] to-[#9104FF] inline-block text-transparent bg-clip-text"
                  >
                    @orbiter_finance
                  </a>

                  {addressCopied ? (
                    <CheckCircleIcon
                      className="text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
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

                  <a href="https://twitter.com" target="_blank">
                    <IconContext.Provider value={{ color: "#1DA1F2", className: "h-7 w-7 " }}>
                      <AiOutlineTwitter />
                    </IconContext.Provider>
                  </a>
                  <a href="https://github.com" target="_blank">
                    <IconContext.Provider value={{ className: "h-6 w-6 " }}>
                      <AiOutlineGithub />
                    </IconContext.Provider>
                  </a>
                  <a href="https://buidlguidl.com/" target="_blank">
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
            <div className="absolute  bg-white rounded-xl top-16 -left-0 sm:right-0 py-3 px-8  border-[1px] border-[#e5e8ed]">
              <button onClickCapture={() => setAddVote(true)} className="flex gap-4 items-center">
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-[#68778D]" />
                <p onClick={() => handleSaveBallot()}>Edit Distribution</p>
              </button>
              <button className="flex gap-4 items-center">
                <ArrowUturnRightIcon className="w-6 h-6 text-[#68778D]" />
                <p>Share</p>
              </button>
              <button className="flex gap-4 items-center">
                <FlagIcon className="w-6 h-6 text-[#68778D]" />
                <p>Report</p>
              </button>
            </div>
          )}

          {voteAmount ? (
            <button className="rounded-md flex py-2 px-8 items-center  border border-gray-300 text-[#FF0420] font-medium text-base leading-6">
              <CheckCircleIcon className="text-gray-600 font-semibold  h-10 w-10 text-[#FF0420] mr-4" />
              {`${voteAmount} OP allocated`}
            </button>
          ) : (
            <button
              onClick={() => setAddVote(true)}
              className="rounded-lg flex  items-center  bg-[#FF0420] text-white py-2 px-8"
            >
              <FolderIcon className="text-gray-600 font-semibold  h-10 w-10 text-white mr-4" />
              Add to ballot
            </button>
          )}

          {addVote && <VoteModal onClose={() => setAddVote(false)} handleAddBallot={() => handleAddBallot()} />}

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
      </div>
    </div>
  );
};
