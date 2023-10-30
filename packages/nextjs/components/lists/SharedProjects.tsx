import React, { useState } from "react";
import Image from "next/image";
import AddListButton from "../op/btn/AddListButton";
import EditDistributionModal from "../op/modals/EditDistributionModal";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import CustomProjectButton from "~~/components/op/btn/CustomProjectButton";
import { IList } from "~~/types/list";

interface Props {
  list: IList;
}

const SharedProjects: React.FC<Props> = ({ list }) => {
  const { projects, populatedProjects } = list;
  const [editBallot, setEditBallot] = useState(false);

  const handleEditModal = () => {
    setEditBallot(!editBallot);
  };
  console.log(list);

  return (
    <div className=" border-[#a2aab6] border-2 rounded-3xl gap-10 grid  px-8 py-10">
      <div className="project__header-container min-w-[320px]">
        <div className="project__header-container--content">
          <h3 className="text-lg sm:text-2xl font-bold   items-center">
            <span>{projects?.length} projects</span>
            <span> {projects?.reduce((sum, p) => sum + p.allocation, 0)} OP allocated</span>
          </h3>
          <div className="grid grid-flow-col gap-3 sm:gap-6">
            <CustomProjectButton
              onClick={handleEditModal}
              text="Edit distribution"
              customClassName="border-[#d3dde7] py-2 border-2 text-[#4d4f52]"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </CustomProjectButton>

            <AddListButton list={list} toggleEditModal={editBallot} />
          </div>
        </div>
      </div>
      <div
        className="max-h-[500px] pr-2 overflow-y-auto 
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-thumb-[#E2E8F0]"
      >
        {populatedProjects?.map((project, index: number) => (
          <div
            key={index}
            className={`border-[#ccd2db] py-2 ${
              index === populatedProjects.length - 1 ? "" : "border-b-2"
            }  grid grid-flow-col items-center justify-between `}
          >
            <div className={`${!project.name && "items-center"} grid  grid-flow-col gap-4`}>
              <div className={` ${project.name ? "w-[80px]" : "w-[60px]"}`}>
                <Image
                  alt="project list"
                  height={"80"}
                  width={"80"}
                  src={`${project?.profileImageUrl ? project.profileImageUrl : "/assets/gradient-bg.png"}`}
                  className="w-full rounded-xl"
                />
              </div>
              <div className="">
                <h3 className="font-bold text-lg">{project.name}</h3>
                {/* {project.name && <p className="mt-0 text-[1.1rem] text-[#7f97b0]">@{project.handle}</p>} */}
              </div>
            </div>
            <p className="text-lg">{project.allocation} OP</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-base-300 px-5 grid grid-flow-col justify-between items-center">
        <p>Total</p>
        <p>{projects?.reduce((sum, p) => sum + p.allocation, 0)} OP</p>
      </div>

      {editBallot && <EditDistributionModal list={list} onClose={() => handleEditModal()} />}
    </div>
  );
};

export default SharedProjects;
