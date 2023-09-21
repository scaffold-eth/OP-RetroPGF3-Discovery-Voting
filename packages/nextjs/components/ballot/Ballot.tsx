import React, { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "usehooks-ts";
import { useBallot } from "~~/context/BallotContext";

const BallotComponent: React.FC = () => {
  const { state, dispatch } = useBallot();
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  const toggleBallot = () => {
    setIsOpen(!isOpen);
  };

  const updateAllocation = (projectId: string, newAllocation: number) => {
    dispatch({ type: "UPDATE_ALLOCATION", projectId, newAllocation });
  };

  const removeProject = (targetId: string) => {
    dispatch({ type: "REMOVE_PROJECT", targetId });
  };

  return (
    <div className="relative pr-2">
      {/* <button onClick={toggleBallot} className="flex items-center">
        <span className="bg-red-500 text-white rounded-full p-2">{state.projects.length}</span>
        <span className="ml-2">Ballot</span>
      </button> */}
      <button
        type="button"
        onClick={toggleBallot}
        className={`btn min-w-[120px] flex flex-col btn-secondary btn-block rounded-full h-10 btn-sm pl-2 pr-2 border-2 mr-2 border-slate-200 ${
          !isDarkMode ? "hover:bg-slate-200" : "hover:bg-slate-500"
        }`}
      >
        View ballot
        <div className="badge badge-neutral ml-2 rounded-full px-2 py-3">{state.projects.length}</div>
      </button>
      {isOpen && (
        <div className="absolute  mt-2.5 right-0 top-full bg-white border p-4 w-[400px] rounded shadow-lg">
          <ul>
            {state.projects.map(project => (
              <li key={project.id} className="flex justify-between items-center mb-2 text-OPblack">
                <span className="flex-grow truncate">{project.name}</span>
                <div className="flex flex-col w-1/4">
                  <label className="text-xs">OP Allocated</label> {/* Label added */}
                  <input
                    type="number"
                    value={project.allocation ? project.allocation : 0}
                    onChange={e => updateAllocation(project.id, Number(e.target.value))}
                    className="border rounded p-1"
                  />
                </div>
                <button
                  onClick={() => removeProject(project.id)}
                  className="border py-1 px-2 mt-4 rounded text-red-500 ml-2"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-2">
            <Link href="/ballot-review">
              <button onClick={toggleBallot} className="bg-blue-500 text-white p-2 rounded mt-4">
                Review Ballot
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BallotComponent;
