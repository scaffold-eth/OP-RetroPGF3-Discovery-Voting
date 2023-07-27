import React, { useState } from "react";
import Modal from "./Modal";
import { AdjustmentsHorizontalIcon, SquaresPlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

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
          <h3 className="text-2xl font-bold   items-center">
            <span>{projectData.length} projects</span>{" "}
            <span className="text-center rounded-full bg-black w-2 h-2"></span> <span>100k OP allocated</span>
          </h3>
          <div className="grid grid-flow-col gap-3 sm:gap-6">
            <button className=" grid grid-flow-col items-center p-2  justify-center rounded-lg border-[#d3dde7] border-2 text-[#4d4f52]">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span className="pl-2">Edit distribution</span>
            </button>
            <button
              onClick={() => setAddBallot(true)}
              className="grid grid-flow-col items-center justify-center p-2  bg-[#ff0000] rounded-lg border-[#ff0000]  text-[#ffffff]"
            >
              <SquaresPlusIcon className="w-5 h-5" />
              <span className="pl-2">Add to ballot</span>
            </button>
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
                <img src="/assets/gradient-bg.png" className="w-full rounded-xl" />
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
                      <img src="/assets/gradient-bg.png" className="w-full rounded-xl" />
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
              <button className=" grid grid-flow-col items-center p-2  justify-center rounded-lg border-[#d3dde7] border-2 text-[#4d4f52]">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <span className="pl-2">Edit distribution</span>
              </button>
              <button
                onClick={handleAddBallot}
                className="grid grid-flow-col items-center justify-center p-2  bg-[#ff0000] rounded-lg border-[#ff0000]  text-[#ffffff]"
              >
                <SquaresPlusIcon className="w-5 h-5" />
                <span className="pl-2">Add to ballot</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isAdding && (
        <Modal
          onClose={() => {
            console.log("working");
          }}
        >
          <div className=" w-fit md:w-[400px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-6">
            <div className="p-2 w-fit rounded-xl bg-[#D7E6F9]">
              {/* the spinner only works for updated version of daisyUI */}
              <span className="loading loading-spinner loading-lg text-info"></span>
            </div>
            <h3 className="text-lg font-bold ">Add list to ballot</h3>
          </div>
        </Modal>
      )}
      {isSuccess && (
        <Modal onClose={() => setIsSuccess(false)}>
          <div className="relative w-fit md:w-[400px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-6">
            <XMarkIcon
              onClick={() => setIsSuccess(false)}
              className="w-6 h-6 cursor-pointer   absolute right-4 top-4"
            />
            <div className="p-2 w-fit rounded-xl bg-[#DEEDDE]">
              <ShieldCheckIcon className="w-8 h-8 text-[#3D8A40]" />
            </div>
            <h3 className="text-lg font-bold ">list added to ballot</h3>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectList;
