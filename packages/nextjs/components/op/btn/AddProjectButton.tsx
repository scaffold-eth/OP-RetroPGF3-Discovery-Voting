import { FolderIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

interface IAddProjectButtonProps {
  disabled?: boolean;
  setEditBallotVote: (value: boolean) => void;
  customClass?: string;
  isAdded?: boolean;
  newAllocation: number;
}
const AddProjectButton: React.FC<IAddProjectButtonProps> = ({
  disabled,
  setEditBallotVote,
  customClass,
  isAdded,
  newAllocation,
}) => {
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
    </>
  );
};

export default AddProjectButton;
