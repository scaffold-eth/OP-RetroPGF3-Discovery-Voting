import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomProjectButton from "../btn/CustomProjectButton";
import OPInput from "../input/OPInput";
import BaseModal from "./BaseModal";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useBallot } from "~~/context/BallotContext";
import { IList } from "~~/types/list";
import { notification } from "~~/utils/scaffold-eth";

interface Props {
  list: IList;
  onClose: () => void;
}

type IProjectsToImport = {
  name: string;
  id: string;
  votes: number;
  listId: string;
}[];

const EditDistributionModal: React.FC<Props> = ({ list, onClose }) => {
  const [showError, setShowError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const { populatedProjects } = list;
  const [projectsToImport, setProjectsToImport] = useState(populatedProjects);
  const [editedProjectsToImport, setEditedProjectsToImport] = useState<IProjectsToImport>(projectsToImport);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useBallot();

  const handleAllocationChange = (projectId: string, newAllocation: number | string) => {
    setEditedProjectsToImport(
      editedProjectsToImport.map(project =>
        project.id === projectId ? { ...project, votes: Number(newAllocation) } : project,
      ),
    );
  };

  useEffect(() => {
    const checkTotalTokenAllocation = () => {
      setShowError(false);
      setErrorMessage("");
      const allocatedTokens = editedProjectsToImport.reduce((sum, p) => sum + p.votes, 0);
      if (allocatedTokens > state.totalTokens) {
        setShowError(true);
        setErrorMessage(`Exceeded your total OP tokens`);
      }
    };
    checkTotalTokenAllocation();
  }, [editedProjectsToImport, state]);

  const handleEditComplete = (newProjects: IProjectsToImport) => {
    setIsLoading(true);
    dispatch({ type: "ADD_EDITED_LIST", projects: newProjects });
    notification.success("Added successfully");
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  function handleRemoveProject(projectId: string) {
    const myObj = [...projectsToImport];
    const editedObj = myObj.filter(project => project.id !== projectId);
    setProjectsToImport(editedObj);
    setEditedProjectsToImport(editedObj);
  }

  const resetDistribution = () => {
    setEditedProjectsToImport(populatedProjects);
  };

  return (
    <BaseModal onClose={onClose}>
      <div className=" w-fit md:w-[600px] lg:w-[800px] bg-white rounded-xl p-6">
        <div className="grid gap-6  grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold text-center">Edit distribution</h3>
          <button onClick={onClose} className="text-lg btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        <CustomProjectButton
          text="Reset distribution"
          onClick={resetDistribution}
          customClassName="text-primary bg-secondary border-none shadow-none"
        >
          <ArrowPathIcon className="h-3 w-3" />
        </CustomProjectButton>
        <div
          className="max-h-[400px] pr-2 overflow-y-auto 
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-thumb-OPlightgray"
        >
          {projectsToImport.map((project, index) => (
            <div
              key={index}
              className={`border-[#ccd2db] py-6 ${
                index === projectsToImport.length - 1 ? "" : "border-b-2"
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
              <div className="flex flex-row">
                {project.votes ? (
                  <OPInput
                    index={index}
                    value={project.votes}
                    handleChange={() => {
                      return;
                    }}
                    customClassesGroup="mr-2 pointer-events-none"
                    customClassesInput="pointer-events-none text-[#8496AE] bg-[#E2E8F0] border-neutral cursor-default"
                    customClassesSpan="bg-[#E2E8F0] text-[#8496AE] border-neutral pointer-events-none"
                  />
                ) : (
                  ""
                )}
                <label className={`input-group rounded`}>
                  <input
                    type="number"
                    onChange={e => handleAllocationChange(project.id, e.target.value)}
                    className={`input input-info input-bordered border-slate-200 border w-[100px] rounded `}
                    value={
                      editedProjectsToImport[index] && editedProjectsToImport[index].votes === 0
                        ? ""
                        : editedProjectsToImport[index].votes
                    }
                  />
                  <span className={`rounded bg-secondary border-r border-b border-t border-slate-200`}>OP</span>
                </label>
                <button
                  onClick={() => handleRemoveProject(project.id)}
                  className={`ml-2 btn-md flex items-center rounded-xl p-3 border-[1px] border-slate-200`}
                >
                  <TrashIcon className="w-6 h-6 " />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showError ? (
          <div className="mt-4 rounded-2xl bg-warning text-warning-content px-5 grid grid-flow-col justify-between items-center">
            <p>{errorMessage}</p>
            <p>
              {editedProjectsToImport.reduce((sum, p) => sum + p.votes, 0)}/{state.totalTokens} OP
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-OPoffwhite px-5 grid grid-flow-col justify-between items-center">
            <p>Total</p>
            <p>
              {editedProjectsToImport.reduce((sum, p) => sum + p.votes, 0)}/{state.totalTokens} OP
            </p>
          </div>
        )}
        <div className="mt-6 grid sm:grid-flow-col gap-3 sm:gap-6">
          <CustomProjectButton
            text="Cancel"
            onClick={onClose}
            customClassName="border-OPlightgray py-2 border-2 text-OPblack"
          />

          <CustomProjectButton
            text="Add to ballot"
            onClick={() => handleEditComplete(editedProjectsToImport)}
            customClassName={`bg-[#000000] py-2 rounded-lg border-[#000000]  text-[#ffffff] ${
              isLoading ? "loading" : ""
            }`}
            disabled={showError}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default EditDistributionModal;
