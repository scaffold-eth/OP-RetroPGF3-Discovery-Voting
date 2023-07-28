import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

const YourBallot = () => {
  return (
    <div className="border-[#CBD5E0] border-[1px] h-fit px-6 py-10 rounded-xl">
      <h3 className="text-[#47556a]">YOUR BALLOT</h3>
      <div className="mt-5">
        <p className="p-0 m-0 text-sm text-[#7f97b0] ">Voting ends in</p>
        <span className="font-bold text-lg">3d:12h:30m:24s</span>
      </div>
      <div className="mt-5">
        <p className="p-0 m-0 text-sm text-[#7f97b0]">Projects added</p>
        <p className="p-0 m-0">
          <span className="font-bold text-lg">15</span>
          <span className="text-[#7f97b0]">/200</span>
        </p>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-2 justify-between">
          <p className="p-0 m-0 text-sm text-[#7f97b0]">OP allocated </p>
          <span className="font-bold text-end ">330,136 OP</span>
        </div>
        <div>
          <progress className="progress progress-error  w-full" value="40" max="100"></progress>
        </div>
        <div className="grid grid-cols-2 justify-between text-[#7f97b0]">
          <p className="p-0 m-0 text-sm ">Total</p>
          <span className=" text-end text-[#7f97b0]">30,000,000 OP</span>
        </div>
      </div>
      <div className="mt-5">
        <button disabled className=" py-3 w-full rounded-lg bg-[#E2E8F0] text-[#A9B9CC]">
          No Projects added yet
        </button>
      </div>
      <div className="divider "></div>
      <div className="mt-7 text-[#47556a]">
        <p className="text-sm">Some instructional copy for the connected viewers :)</p>
        <div className="text-[#2173DF] grid grid-flow-col justify-start items-center gap-2">
          <p className="text-bold ">Voting guideline</p>
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default YourBallot;
