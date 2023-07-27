import React, { useState } from "react";
import Image from "next/image";
import CustomProjectButton from "../btn/CustomProjectButton";
import Modal from "./BaseModal";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import { AdjustmentsHorizontalIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";

interface IProjectData {
  name: string;
  handle: string;
  image: string;
  op: string;
}
const ProjectList = ({ projectData }: { projectData: IProjectData[] }) => {
  const [addBallot, setAddBallot] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddBallot = () => {
    setAddBallot(false);
    setIsAdding(!true);
    setIsSuccess(true);
  };
  return (
    <div className=" border-[#a2aab6] border-2 rounded-3xl gap-10 grid  px-8 py-10">
      <div className="project__header-container min-w-[320px]">
        <div className="project__header-container--content">
          <h3 className="text-lg sm:text-2xl font-bold   items-center">
            <span>{projectData.length} projects</span>{" "}
            <span className="text-center rounded-full bg-black w-2 h-2"></span> <span>100k OP allocated</span>
          </h3>
          <div className="grid grid-flow-col gap-3 sm:gap-6">
            <CustomProjectButton text="Edit distribution" customClassName="border-[#d3dde7] border-2 text-[#4d4f52]">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </CustomProjectButton>

            <CustomProjectButton
              onClick={() => setAddBallot(true)}
              text="Add to ballot"
              customClassName=" bg-[#ff0000] rounded-lg border-[#ff0000]  text-[#ffffff]"
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
        {projectData.map((project: IProjectData, index: number) => (
          <div
            key={index}
            className={`border-[#ccd2db] py-6 ${
              index === projectData.length - 1 ? "" : "border-b-2"
            }  grid grid-flow-col items-center justify-between `}
          >
            <div className="grid  grid-flow-col gap-4">
              <div className="w-[80px]">
                <Image
                  alt="project list  "
                  height={"80"}
                  width={"80"}
                  src="/assets/gradient-bg.png"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="">
                <h3 className="font-bold text-lg">{project.name}</h3>
                <p className="mt-0 text-[1.1rem] text-[#7f97b0]">@{project.handle}</p>
              </div>
            </div>
            <p className="text-lg">{project.op} OP</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-[#F1F4F9] px-5 grid grid-flow-col justify-between items-center">
        <p>Total</p>
        <p>30,000,000 OP</p>
      </div>
      {addBallot && (
        <Modal onClose={() => setAddBallot(false)}>
          <div className=" w-fit md:w-[600px] lg:w-[800px] bg-white rounded-xl p-6">
            <div className="grid gap-6  grid-flow-col items-center justify-between">
              <h3 className="text-lg font-bold ">Add Solrpunk utopia Dream to your ballot</h3>
              <button onClick={() => setAddBallot(false)} className="text-lg btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>
            <div
              className="max-h-[400px] pr-2 overflow-y-auto 
            scrollbar-thin
            scrollbar-thumb-rounded-full
            scrollbar-thumb-[#E2E8F0]"
            >
              {projectData.map((project: IProjectData, index: number) => (
                <div
                  key={index}
                  className={`border-[#ccd2db] py-4 ${
                    index === projectData.length - 1 ? "" : "border-b-2"
                  }  grid grid-flow-col items-center justify-between `}
                >
                  <div className="grid  grid-flow-col items-center gap-4">
                    <div className="w-[60px]">
                      <Image
                        alt="project list  "
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
                  <p className="text-lg">{project.op} OP</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-[#F1F4F9] px-5 grid grid-flow-col justify-between items-center">
              <p>Total</p>
              <p>30,000,000 OP</p>
            </div>
            <div className="mt-6 grid sm:grid-flow-col gap-3 sm:gap-6">
              <CustomProjectButton text="Edit distribution" customClassName="border-[#d3dde7] border-2 text-[#4d4f52]">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
              </CustomProjectButton>

              <CustomProjectButton
                onClick={handleAddBallot}
                text="Add to ballot"
                customClassName=" bg-[#ff0000] rounded-lg border-[#ff0000]  text-[#ffffff]"
              >
                <SquaresPlusIcon className="w-5 h-5" />
              </CustomProjectButton>
            </div>
          </div>
        </Modal>
      )}
      {isAdding && <LoadingModal message="Add list to ballot" />}
      {isSuccess && <SuccessModal message="list added to ballot" onClose={() => setIsSuccess(false)} />}
    </div>
  );
};

export default ProjectList;
