import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Spinner } from "../Spinner";
import CreateList from "../lists/CreateList";
import CustomProjectButton from "../op/btn/CustomProjectButton";
import SuccessModal from "../op/modals/SuccessModal";
import { ShareIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";
import { useBallot } from "~~/context/BallotContext";

const BallotReview: React.FC = () => {
  const { state } = useBallot();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    // Validate ballot
    // sign ballot
    // send signed data to api
    console.log("submitting votes");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);
  };

  return (
    <div className="relative border-[#a2aab6] border-2 rounded-3xl gap-10 grid  px-8 py-10">
      <div className="project__header-container min-w-[320px]">
        <div className="project__header-container--content text-center">
          <h3 className="text-lg sm:text-2xl font-bold items-center">Review Ballot</h3>
          <p className="p-0 m-0 text-sm text-[#7f97b0] font-bold items-center">Voting Power: {state.totalTokens} OP</p>
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
            }  grid grid-flow-col items-center justify-between `}
          >
            <div className={`${!project.name && "items-center"} grid  grid-flow-col gap-4`}>
              <div className={` ${project.name ? "w-[80px]" : "w-[60px]"}`}>
                <Image
                  alt="project list"
                  height={"80"}
                  width={"80"}
                  src="/assets/gradient-bg.png"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="">
                <h3 className="font-bold text-lg">{project.name}</h3>
              </div>
            </div>
            <p className="text-lg">{project.allocation} OP</p>
          </li>
        ))}
      </ul>
      <div className="rounded-2xl bg-[#F1F4F9] px-5 grid grid-flow-col justify-between items-center">
        <p>Total</p>
        <p>{state.projects.reduce((sum, p) => sum + p.allocation, 0)} OP</p>
      </div>
      <div>
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
      </div>
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
