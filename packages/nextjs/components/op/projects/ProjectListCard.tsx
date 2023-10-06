import React from "react";
import Image from "next/image";
import { IProjectData } from "../../../types/list";

const ProjectListCard: React.FC<{ projectData: IProjectData[] }> = ({ projectData }) => {
  return (
    <div>
      {projectData.map((project: IProjectData, index: number) => (
        <div
          key={index}
          className={`border-OPlightgray py-2 ${
            index === projectData.length - 1 ? "" : "border-b-2"
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
              {project.handle && <p className="mt-0 text-[1.1rem] text-OPbluegray">@{project.handle}</p>}
            </div>
          </div>
          <p className="text-lg">{project.votes.toLocaleString()} OP</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectListCard;
