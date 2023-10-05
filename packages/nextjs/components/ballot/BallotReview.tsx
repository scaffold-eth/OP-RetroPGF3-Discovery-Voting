import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchProjects from "../SearchProjects";
import { Spinner } from "../Spinner";
// import CreateList from "../lists/CreateList";
import CustomProjectButton from "../op/btn/CustomProjectButton";
// import EditDistributionModal from "../op/modals/EditDistributionModal";
import SuccessModal from "../op/modals/SuccessModal";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import { useBallot } from "~~/context/BallotContext";

// import { useProjects } from "~~/context/ProjectsContext";

const BallotReview: React.FC = () => {
  const { state, dispatch } = useBallot();
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading] = useState(false);
  // const { projects } = useProjects();

  // const onClose = () => {
  //   setIsOpen(false);
  // };

  // const handleSubmit = () => {
  //   // Validate ballot
  //   // sign ballot
  //   // send signed data to api
  //   console.log("submitting votes");
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setIsSuccess(true);
  //   }, 3000);
  // };

  const handleRemoveProject = (projectId: any) => {
    dispatch({ type: "REMOVE_PROJECT", targetId: projectId });
  };

  //- {state.totalTokens} OP allocated
  return (
    <div className="relative border-[#a2aab6] border-2 rounded-3xl gap-10 grid  px-24 py-10">
      <div className="project__header-container min-w-[720px] flex items-center justify-around">
        <div className="project__header-container--content text-center flex items-center justify-center">
          {/* <p className="p-0 m-0 text-sm text-[#7f97b0] font-bold">28 Projects - 100 OP allocated</p> */}
          <span className="font-bold text-lg">{state.projects.length} Projects </span>
          <span className="font-bold">-</span>
          <span className="font-bold text-end ">
            {state.projects.reduce((sum, p) => sum + p.allocation, 0)} OP allocated
          </span>
        </div>
        <div>
          <SearchProjects />
        </div>
      </div>
      <ul
        className="max-h-[500px] pr-2 overflow-y-auto 
        scrollbar-thin
        scrollbar-thumb-rounded-full
        scrollbar-thumb-[#E2E8F0]"
      >
        {state.projects.map((project: any, index: any) => (
          <li
            key={index}
            className={`border-[#ccd2db] py-6 ${
              index === state.projects.length - 1 ? "" : "border-b-2"
            }  grid grid-cols-[1fr,1fr,auto] items-center justify-between `}
          >
            <div className={`${!project.name && "items-center"} grid grid-flow-col gap-4`}>
              <div className={` ${project.name ? "w-[80px]" : "w-[60px]"}`}>
                <Image
                  alt="project list"
                  height={"80"}
                  width={"80"}
                  src="/assets/gradient-bg.png"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-lg">{project.name}</h3>
              </div>
            </div>
            <p className="text-lg ml-36">{project.allocation} OP</p>
            {/* <button className="text-red-5000 text-lg" onClick={() => handleRemoveProject(project.id)}>
              Delete
            </button> */}
            <CustomProjectButton
              disabled={!state.projects.length ? true : false}
              text=""
              onClick={() => handleRemoveProject(project.id)}
            >
              <MinusCircleIcon className="text-red-500 w-6 h-6" />
            </CustomProjectButton>
          </li>
        ))}
      </ul>
      <div className="rounded-2xl bg-[#F1F4F9] px-5 grid grid-flow-col justify-between items-center text-OPblack">
        <p>Total</p>
        <p>{state.projects.reduce((sum, p) => sum + p.allocation, 0)} OP</p>
      </div>
      {/* <div>
        <CustomProjectButton
          disabled={!state.projects.length ? true : false}
          onClick={() => handleSubmit()}
          text="Submit ballot"
          customClassName="w-full bg-[#000000] py-2 rounded-lg border-[#000000]  text-[#ffffff]"
        >
          <SquaresPlusIcon className="w-5 h-5" />
        </CustomProjectButton>
        <CustomProjectButton
          disabled={!state.projects.length ? true : false}
          onClick={() => setIsOpen(true)}
          text="Share as list"
          customClassName="mt-4 w-full bg-[#008080] py-2 rounded-lg border-[#008080]  text-[#ffffff]"
        >
          <ShareIcon className="w-5 h-5" />
        </CustomProjectButton>
        <CreateList onClose={onClose} isOpen={isOpen} />
      </div> */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      )}
      {isSuccess && (
        <SuccessModal
          message={"Ballot submitted successfully"}
          onClose={() => {
            setIsSuccess(false);
            router.push("/projects");
          }}
        />
      )}
    </div>
  );
};

export default BallotReview;
