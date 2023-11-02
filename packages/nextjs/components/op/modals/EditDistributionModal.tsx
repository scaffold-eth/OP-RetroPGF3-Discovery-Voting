import React, { useEffect, useState } from "react";
import CustomProjectButton from "../btn/CustomProjectButton";
import BaseModal from "./BaseModal";
import { ArrowPathIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import ProjectRowEditable from "~~/components/shared/ProjectRowEditable";
import { ListProject, useBallot } from "~~/context/BallotContext";
import { IList } from "~~/types/list";
import { notification } from "~~/utils/scaffold-eth";

interface Props {
  list: IList;
  onClose: () => void;
}

const EditDistributionModal: React.FC<Props> = ({ list, onClose }) => {
  const [showError, setShowError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const { populatedProjects } = list;
  const [projectsToImport, setProjectsToImport] = useState(populatedProjects);
  const [editedProjectsToImport, setEditedProjectsToImport] = useState<ListProject[]>(projectsToImport);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useBallot();
  const [resetCounter, setResetCounter] = useState(0);

  const handleAllocationChange = (projectId: string, newAllocation: number | string) => {
    setEditedProjectsToImport(
      editedProjectsToImport.map(project =>
        project._id === projectId ? { ...project, allocation: Number(newAllocation) } : project,
      ),
    );
  };

  useEffect(() => {
    const checkTotalTokenAllocation = () => {
      setShowError(false);
      setErrorMessage("");
      const allocatedTokens = editedProjectsToImport.reduce((sum, p) => sum + p.allocation, 0);
      if (allocatedTokens > state.totalTokens) {
        setShowError(true);
        setErrorMessage(`Exceeded your total OP tokens`);
      }
    };
    checkTotalTokenAllocation();
  }, [editedProjectsToImport, state]);

  const handleEditComplete = (newProjects: ListProject[]) => {
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
    const editedObj = myObj.filter(project => project._id !== projectId);
    setProjectsToImport(editedObj);
    setEditedProjectsToImport(editedObj);
  }

  const resetDistribution = () => {
    setProjectsToImport(populatedProjects);
    setEditedProjectsToImport(populatedProjects);
    setResetCounter(resetCounter + 1);
  };

  return (
    <BaseModal onClose={onClose}>
      <div className=" w-fit md:w-[600px] lg:w-[800px] bg-secondary rounded-xl p-6">
        <div className="grid gap-6 grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold text-center">Edit Distribution</h3>
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
              className={`border-OPlightgray py-2 ${
                index === projectsToImport.length - 1 ? "" : "border-b-2"
              }  grid grid-flow-col items-center justify-between `}
            >
              <ProjectRowEditable
                project={project}
                showOriginalAllocation
                resetCounter={resetCounter}
                handleChange={handleAllocationChange}
                handleRemove={handleRemoveProject}
              />
            </div>
          ))}
        </div>
        {showError ? (
          <div className="mt-4 rounded-2xl bg-warning text-warning-content px-5 grid grid-flow-col justify-between items-center">
            <p>{errorMessage}</p>
            <p>
              {editedProjectsToImport.reduce((sum, p) => sum + p.allocation, 0)}/{state.totalTokens} OP
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-secondary px-5 grid grid-flow-col justify-between items-center">
            <p>Total</p>
            <p>
              {editedProjectsToImport.reduce((sum, p) => sum + p.allocation, 0)}/{state.totalTokens} OP
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
            text="Add to Ballot"
            onClick={() => handleEditComplete(editedProjectsToImport)}
            customClassName={`bg-red-600 py-2 rounded-lg border-OPred text-OPwhite ${isLoading ? "loading" : ""}`}
            disabled={showError}
          >
            <SquaresPlusIcon className="w-5 h-5" />
          </CustomProjectButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default EditDistributionModal;
