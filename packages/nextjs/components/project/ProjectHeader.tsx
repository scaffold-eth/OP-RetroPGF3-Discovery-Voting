// TODO add type checking to file by removing next line, reliant on fixing EditDistributionModal
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AddProjectButton from "../op/btn/AddProjectButton";
// import AlreadyOnBallotConflictModal from "../op/modals/AlreadyOnBallotConflictModal";
// import EditDistributionModal from "../op/modals/EditDistributionModal";
import CopyToClipboard from "react-copy-to-clipboard";
import { IconContext } from "react-icons";
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { AdjustmentsHorizontalIcon, DocumentDuplicateIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ArrowUturnRightIcon, CheckCircleIcon, FlagIcon } from "@heroicons/react/24/solid";
import { useBallot } from "~~/context/BallotContext";
import { ProjectDocument } from "~~/models/Project";
import { isAddedToBallot } from "~~/utils/isAddedToBallot";

// TODO: This component is half-using db and half using stubbed data, need point to db for any stubbed data
const ProjectHeader = ({ project }: { project: ProjectDocument }) => {
  const handle = project && project.twitterLink ? `@${project.twitterLink.replace("https://twitter.com/", "")}` : "";
  const [addressCopied, setAddressCopied] = useState(false);
  const [editBallot, setEditBallot] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { state } = useBallot();
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

  const toggleEditBallotVote = () => {
    setEditBallot(!editBallot);
  };

  useEffect(() => {
    if (!state) return;
    setIsAdded(false);
    const isProjectInBallot = isAddedToBallot(state, project);
    setIsAdded(isProjectInBallot);
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
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-xl rounded-box w-52">
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
          <AddProjectButton project={project} toggleEditModal={editBallot} />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
