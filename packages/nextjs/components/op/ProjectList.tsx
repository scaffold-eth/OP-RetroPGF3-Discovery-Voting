import React from "react";

interface IProjectData {
  name: string;
  handle: string;
  image: string;
  op: string;
}
const ProjectList = ({ projectData }: { projectData: IProjectData[] }) => {
  return (
    <div className=" border-[#a2aab6] border-2 rounded-3xl gap-10 grid  px-8 py-10">
      <div className="grid sm:grid-flow-col justify-between">
        <h3 className="text-2xl font-bold   items-center">
          <span>6 projects</span> <span className="text-center rounded-full bg-black w-2 h-2"></span>{" "}
          <span>100k OP allocated</span>
        </h3>
        <div className="grid grid-flow-col gap-6">
          <button className="btn rounded-lg border-[#d3dde7] btn-outline text-[#4d4f52]">Edit distribution</button>
          <button className="btn bg-[#ff0000] rounded-lg border-[#ff0000] btn-outline text-[#ffffff]">
            Add to ballot
          </button>
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default ProjectList;
