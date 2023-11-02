import React from "react";
import CountdownTimer from "./YourBallotCountdown";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useBallot } from "~~/context/BallotContext";
import { useProjects } from "~~/context/ProjectsContext";

const YourBallot = () => {
  const { state } = useBallot();
  const { projects } = useProjects();

  const fakeTimestamp = 1700453260;
  const votingDeadline = fakeTimestamp;

  return (
    <div className="border-OPlightgray border-[1px] h-fit px-6 py-10 rounded-xl">
      <h3 className="text-OPextradarkgray">YOUR BALLOT</h3>
      <div className="mt-5">
        {/* <p className="p-0 m-0 text-sm text-OPbluegray ">Voting ends in</p> */}
        <CountdownTimer deadline={votingDeadline} />
      </div>
      <div className="mt-5">
        <p className="p-0 m-0 text-sm text-OPbluegray">Projects Added</p>
        <p className="p-0 m-0">
          <span className="font-bold text-lg">{state.projects.length}</span>
          <span className="text-OPbluegray">/{projects.length}</span>
        </p>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-2 justify-between">
          <p className="p-0 m-0 text-sm text-OPbluegray">OP Allocated </p>
          <span className="font-bold text-end ">{state.projects.reduce((sum, p) => sum + p.allocation, 0)} OP</span>
        </div>
        <div>
          <progress
            className="progress custom__progress  w-full"
            value={state.projects.reduce((sum, p) => sum + p.allocation, 0)}
            max={state.totalTokens}
          ></progress>
        </div>
        <div className="grid grid-cols-2 justify-between text-OPbluegray">
          <p className="p-0 m-0 text-sm ">Total</p>
          <span className=" text-end text-OPbluegray">{state.totalTokens} OP</span>
        </div>
      </div>
      {state.projects.length === 0 && (
        <div className="mt-5">
          <button disabled className=" py-3 w-full rounded-lg bg-gray-400 text-white">
            No Projects added yet
          </button>
        </div>
      )}

      <div className="divider "></div>
      <div className="mt-7 text-OPextradarkgray">
        <p className="text-sm">Some instructional copy for the connected viewers :)</p>
        <div className="text-OPblue grid grid-flow-col justify-start items-center gap-2">
          <p className="text-bold ">Voting guideline</p>
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default YourBallot;
