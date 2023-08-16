import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

const YourBallot = () => {
  return (
    <div className="border-OPlightgray border-[1px] h-fit px-6 py-10 rounded-xl">
      <h3 className="text-OPextradarkgray">YOUR BALLOT</h3>
      <div className="mt-5">
        <p className="p-0 m-0 text-sm text-OPbluegray ">Voting ends in</p>
        <span className="font-bold text-lg">3d:12h:30m:24s</span>
      </div>
      <div className="mt-5">
        <p className="p-0 m-0 text-sm text-OPbluegray">Projects added</p>
        <p className="p-0 m-0">
          <span className="font-bold text-lg">15</span>
          <span className="text-OPbluegray">/200</span>
        </p>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-2 justify-between">
          <p className="p-0 m-0 text-sm text-OPbluegray">OP allocated </p>
          <span className="font-bold text-end ">330,136 OP</span>
        </div>
        <div>
          <progress className="progress custom__progress  w-full" value="40" max="100"></progress>
        </div>
        <div className="grid grid-cols-2 justify-between text-OPbluegray">
          <p className="p-0 m-0 text-sm ">Total</p>
          <span className=" text-end text-OPbluegray">30,000,000 OP</span>
        </div>
      </div>
      <div className="mt-5">
        <button disabled className=" py-3 w-full rounded-lg bg-customWhite text-OPlightgray">
          No Projects added yet
        </button>
      </div>
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
