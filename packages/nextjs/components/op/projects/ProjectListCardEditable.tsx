/* eslint-disable  @typescript-eslint/no-unused-vars */
// TODO: Currently not using this component. Need to incorperate with new logic
import React, { useState } from "react";
import { IProjectData } from "../../../types/list";
import ProjectRowEditable from "~~/components/shared/ProjectRowEditable";

const ProjectListCardEditable: React.FC<{
  projectData: IProjectData[];
  listAllocation?: IProjectData[];
  emitTotal: (total: number) => void;
}> = ({ projectData, emitTotal }) => {
  const handleChange = (projectId: string, value: number) => {
    // const total = projectData.reduce((a, b) => a + Number(b.allocation), 0);
    // const newTotal = total - Number(projectData[index].allocation) + value;
    // setTotalOP(newTotal);
    // // emit the current state
    // emitTotal(totalOP);
  };

  function handleRemoveProject(projectId: string) {
    const myObj = [...projectData];
    const editedObj = myObj.filter(project => project._id !== projectId);
    // setProjectsToImport(editedObj);
    // setEditedProjectsToImport(editedObj);
  }

  const [totalOP, setTotalOP] = useState(projectData.reduce((a, b) => a + Number(b.allocation), 0));
  return (
    <div>
      {projectData.map((project: IProjectData, index: number) => (
        <div
          key={index}
          className={`border-OPlightgray py-6 ${
            index === projectData.length - 1 ? "" : "border-b-2"
          }  grid grid-flow-col items-center justify-between `}
        >
          <ProjectRowEditable
            project={project}
            showOriginalAllocation
            handleChange={handleChange}
            handleRemove={handleRemoveProject}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectListCardEditable;
