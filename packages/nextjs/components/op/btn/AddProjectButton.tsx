import React, { useEffect, useState } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import LoadingModal from "~~/components/op/modals/LoadingModal";
import SuccessModal from "~~/components/op/modals/SuccessModal";
import VoteModal from "~~/components/op/modals/VoteModal";
import { useBallot } from "~~/context/BallotContext";
import { Project } from "~~/models/Project";
import { isAddedToBallot } from "~~/utils/isAddedToBallot";

interface IAddProjectButton {
  project: Project;
  disabled?: boolean;
  toggleEditModal?: boolean;
  customClass?: string;
}

const AddProjectButton: React.FC<IAddProjectButton> = ({ disabled, project, toggleEditModal, customClass }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { state, dispatch } = useBallot();
  const [editBallotVote, setEditBallotVote] = useState(false);
  const [isAllocationError, setIsAllocationError] = useState(false);

  const [prevProjectAllocation] = state.projects.filter(item => item.id === project._id);
  const [newAllocation, setNewAllocation] = useState<number>(prevProjectAllocation?.allocation ?? 0);

  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toggleInitialized, setToggleInitialized] = useState<boolean | undefined>(undefined);
  // const modalRef = useRef(null);

  useEffect(() => {
    if (!state) return;
    setIsAdded(false);
    const isProjectInBallot = isAddedToBallot(state, project);
    setIsAdded(isProjectInBallot);
  }, [project, state]);

  useEffect(() => {
    if (toggleEditModal === undefined) return;
    if (toggleInitialized) {
      setEditBallotVote(true);
    }
    setToggleInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleEditModal]);

  const addProjectToBallot = () => {
    const _name = project.name as string;
    setNewAllocation(!Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0);
    dispatch({
      type: "ADD_PROJECT",
      project: {
        id: project._id,
        name: _name,
        allocation: !Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0,
      },
    });
  };

  const handleAllocationChange = (value: any) => {
    setIsAllocationError(false);
    let currentTotalAllocation = state.projects.reduce((sum, p) => sum + p.allocation, 0);
    const currentProjectId = project._id;
    // Ensure value is a number
    value = Number(value);

    if (isNaN(value)) {
      value = Number.isNaN(newAllocation) ? 0 : newAllocation;
    }

    // Deduct the current project's allocation, since we're editing it
    const currentProjectAllocation = state.projects.find(p => p.id === currentProjectId)?.allocation || 0;
    currentTotalAllocation -= currentProjectAllocation;

    const projectedTotal = value + currentTotalAllocation;

    if (projectedTotal > state.totalTokens) {
      value = state.totalTokens - currentTotalAllocation;
      setIsAllocationError(true);
    }

    setNewAllocation(value);
  };

  const handleEditBallot = () => {
    let message = "Saving distribution";
    let completedMessage = "Distribution changed successfully";
    if (!isAdded) {
      message = "Adding project to ballot";
      completedMessage = "Successfully added project";
      addProjectToBallot();
    } else {
      dispatch({
        type: "UPDATE_ALLOCATION",
        projectId: project._id,
        newAllocation,
      });
    }
    setLoadingMessage(message);
    setEditBallotVote(false);
    setIsLoading(true);
    // using setTimeout on loading and success modals for better UX
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 1000);
    setSuccessMessage(completedMessage);
  };

  return (
    <>
      <button
        onClick={() => {
          setEditBallotVote(true);
        }}
        disabled={disabled}
        className={`rounded-lg flex items-center py-2 px-4 xl:px-8 whitespace-nowrap ${
          isAdded ? "border-gray-200 text-primary border-2 whitespace-nowrap bg-white" : "bg-primary text-white"
        } ${customClass}`}
      >
        {isAdded ? (
          <CheckBadgeIcon className=" font-semibold  h-6 w-6 text-primary mr-4" />
        ) : (
          <FolderIcon className=" font-semibold  h-6 w-6 text-white mr-4" />
        )}
        {isAdded && newAllocation > 0
          ? `${newAllocation} OP allocated`
          : isAdded && !newAllocation
          ? "0 OP allocated"
          : "Add to Ballot"}
      </button>
      {editBallotVote && (
        <VoteModal
          project={project}
          onClose={() => setEditBallotVote(false)}
          allocation={newAllocation}
          handleAddBallot={() => handleEditBallot()}
          handleAllocationChange={handleAllocationChange}
          isAllocationError={isAllocationError}
        />
      )}
      {isLoading && <LoadingModal message={loadingMessage} />}
      {isSuccess && <SuccessModal message={successMessage} onClose={() => setIsSuccess(false)} />}
    </>
  );
};

export default AddProjectButton;
