import React, { useEffect, useState } from "react";
import { SquaresPlusIcon } from "@heroicons/react/20/solid";
import CustomProjectButton from "~~/components/op/btn/CustomProjectButton";
import AddListToBallotModal from "~~/components/op/modals/AddListToBallotModal";
import EditDistributionModal from "~~/components/op/modals/EditDistributionModal";
import LoadingModal from "~~/components/op/modals/LoadingModal";
import SuccessModal from "~~/components/op/modals/SuccessModal";
import { useBallot } from "~~/context/BallotContext";
import { IList } from "~~/types/list";

interface IAddListButton {
  //   list: IList & ListDocument & PopulatedProjects;
  list: IList;
  disabled?: boolean;
  toggleEditModal?: boolean;
  customClass?: string;
}

const AddListButton: React.FC<IAddListButton> = ({ list, toggleEditModal, customClass }) => {
  const { dispatch } = useBallot();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { projects, populatedProjects } = list;
  const [editBallot, setEditBallot] = useState(false);
  const [isAddListToBallotModal, setIsAddListToBallotModal] = useState(false);
  const [toggleInitialized, setToggleInitialized] = useState<boolean | undefined>(undefined);

  const handleEditModal = (close: boolean, edit = false) => {
    setIsAddListToBallotModal(false);
    setEditBallot(!close && edit);
  };

  useEffect(() => {
    if (toggleEditModal === undefined) return;
    if (toggleInitialized) {
      setEditBallot(true);
    }
    setToggleInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleEditModal]);

  const addProjectToBallot = () => {
    setIsAddListToBallotModal(false);
    setLoadingMessage("Adding to ballot");
    setSuccessMessage("Projects added successfully");
    setIsLoading(true);
    dispatch({
      type: "ADD_LIST",
      projects: populatedProjects,
    });
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <>
      <CustomProjectButton
        onClick={() => setIsAddListToBallotModal(true)}
        text="Add to Ballot"
        customClassName={`bg-OPred hover:bg-red-700 border-none py-2 rounded-lg  text-[#ffffff] ${customClass}`}
      >
        <SquaresPlusIcon className="w-5 h-5" />
      </CustomProjectButton>
      {editBallot && <EditDistributionModal list={list} onClose={() => handleEditModal(true, false)} />}
      {isAddListToBallotModal && (
        <AddListToBallotModal
          listName={list.name}
          onClose={() => setIsAddListToBallotModal(false)}
          handleAddBallot={() => addProjectToBallot()}
          projectList={populatedProjects}
          userTotal={projects.reduce((sum, p) => sum + p.allocation, 0)}
          edit={() => handleEditModal(false, true)}
        />
      )}
      {isLoading && <LoadingModal message={loadingMessage} />}
      {isSuccess && <SuccessModal message={successMessage} onClose={() => setIsSuccess(false)} />}
    </>
  );
};

export default AddListButton;
