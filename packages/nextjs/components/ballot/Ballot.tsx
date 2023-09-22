import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "usehooks-ts";
import { useBallot } from "~~/context/BallotContext";

const BallotComponent: React.FC = () => {
  const { state } = useBallot();
  // const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  // const toggleBallot = () => {
  //   setIsOpen(!isOpen);
  // };

  // const updateAllocation = (projectId: string, newAllocation: number) => {
  //   dispatch({ type: "UPDATE_ALLOCATION", projectId, newAllocation });
  // };

  // const removeProject = (targetId: string) => {
  //   dispatch({ type: "REMOVE_PROJECT", targetId });
  // };

  return (
    <div className="relative pr-2">
      {/* <button onClick={toggleBallot} className="flex items-center">
        <span className="bg-red-500 text-white rounded-full p-2">{state.projects.length}</span>
        <span className="ml-2">Ballot</span>
      </button> */}
      <Link href="/ballot-review">
        <button
          type="button"
          className={`btn min-w-[120px] flex flex-col btn-secondary btn-block rounded-full h-10 btn-sm pl-2 pr-2 border-2 mr-2 border-slate-200 ${
            !isDarkMode ? "hover:bg-slate-200" : "hover:bg-slate-500"
          }`}
        >
          View ballot
          <div className="badge badge-neutral ml-2 rounded-full px-2 py-3">{state.projects.length}</div>
        </button>
      </Link>
    </div>
  );
};

export default BallotComponent;
