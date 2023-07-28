import React, { useState } from "react";
import { ArrowsUpDownIcon, HeartIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

function ListHeader({ displayList }: any) {
  const [active, setActive] = useState("all");
  const handleButtonClick = (options: string) => {
    setActive(options);
  };

  return (
    <div>
      <div className="flex justify-between py-[40px] px-4">
        <h1 className="font-bold text-2xl leading-8 ">Lists</h1>
        <div className="flex gap-2 items-center">
          <div
            className="w-fit border-[1px] border-neutral p-2 rounded cursor-pointer hover:bg-customWhite"
            onClick={() => displayList("colums")}
          >
            <ListBulletIcon className="w-[24px] h-[24px]" />
          </div>
          <div
            className="w-fit border-[1px] border-neutral p-2 rounded cursor-pointer hover:bg-customWhite "
            onClick={() => displayList("grids")}
          >
            <Squares2X2Icon className="w-[24px] h-[24px]" />
          </div>
          <div className="h-[18px] border-l-2 border-neutral  mx-[12px] "></div>
          <button className="flex items-center justify-center px-4 py-2  rounded border-neutral border-[1px] gap-2 cursor-pointer hover:bg-customWhite">
            <span className="flex ">
              <ArrowsUpDownIcon className="w-[15px] h-[25px]" />
            </span>
            Shuffled
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4">
        <button
          onClick={() => handleButtonClick("all")}
          className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
            active == "all" ? "bg-secondary-content text-white dark:bg-black" : "bg-customWhite text-customGrayBtn"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleButtonClick("liked")}
          className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
            active == "liked" ? "bg-secondary-content text-white dark:bg-black" : "bg-customWhite text-customGrayBtn"
          }`}
        >
          <span className="flex">
            <HeartIcon className="w-4 mr-2" />
            Liked
          </span>
        </button>
        <div className="h-[18px] border-l-2 border-neutral  mx-[12px] "></div>
        <button
          onClick={() => handleButtonClick("OP Stack")}
          className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
            active == "OP Stack" ? "bg-secondary-content text-white dark:bg-black" : "bg-customWhite text-customGrayBtn"
          }`}
        >
          OP Stack
          <span className="px-2 py-1 bg-white text-black font-bold rounded ml-2 ">168</span>
        </button>
        <button
          onClick={() => handleButtonClick("Collective Governance")}
          className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
            active == "Collective Governance"
              ? "bg-secondary-content text-white dark:bg-black"
              : "bg-customWhite text-customGrayBtn"
          }`}
        >
          Collective Governance
          <span className="px-2 py-1 bg-white text-black font-bold rounded ml-2 ">33</span>
        </button>
        <button
          onClick={() => handleButtonClick("Developer Ecosystem")}
          className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
            active == "Developer Ecosystem"
              ? "bg-secondary-content text-white dark:bg-black"
              : "bg-customWhite text-customGrayBtn"
          }`}
        >
          Developer Ecosystem
          <span className="px-2 py-1 bg-white text-black font-bold rounded ml-2 ">111</span>
        </button>
        <button
          onClick={() => handleButtonClick("End user UX")}
          className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
            active == "End user UX"
              ? "bg-secondary-content text-white dark:bg-black"
              : "bg-customWhite text-customGrayBtn"
          }`}
        >
          End user UX
          <span className="px-2 py-1 bg-white text-black font-bold rounded ml-2 ">88</span>
        </button>
      </div>
    </div>
  );
}

export default ListHeader;
