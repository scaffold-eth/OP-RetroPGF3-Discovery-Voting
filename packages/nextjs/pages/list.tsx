import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  ArrowUturnRightIcon,
  DocumentIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
  HeartIcon as HeartFilledIcon,
} from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import ProjectList from "~~/components/op/projects/ProjectList";
import YourBallot from "~~/components/op/projects/YourBallot";
import { Address } from "~~/components/scaffold-eth";
import SuggestProjects from "~~/components/shared/SuggestProjects";

const projectData = [
  {
    name: "DefiLlama",
    handle: "defillama",

    image: "/assets/gradient-bg.png",
    op: 20416,
  },
  {
    name: "L2BEAT",
    handle: "l2beat",
    image: "/assets/gradient-bg.png",
    op: 15416,
  },
  {
    name: "Polynya",
    handle: "polynya",
    image: "/assets/gradient-bg.png",
    op: 12416,
  },
  {
    name: "DefiLlama",
    handle: "defillama",

    image: "/assets/gradient-bg.png",
    op: 20416,
  },
  {
    name: "L2BEAT",
    handle: "l2beat",
    image: "/assets/gradient-bg.png",
    op: 15416,
  },
  {
    name: "Polynya",
    handle: "polynya",
    image: "/assets/gradient-bg.png",
    op: 12416,
  },
];

const Project = () => {
  const [openLikedModal, setopenLikedModal] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <div className=" mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-12">
      <YourBallot />
      <div className="">
        <div className="grid mb-3 sm:grid-flow-col items-center">
          <h3 className="text-2xl font-bold">Solarpunk Utopia Dream</h3>
          <div className="grid grid-flow-col gap-4 w-fit sm:w-full sm:justify-end relative">
            <div className=" flex items-center gap-1 rounded-xl p-4 border-[1px] border-[#CBD5E0]">
              <span>12</span>
              {isLiked ? (
                <HeartIcon className="w-6 h-6  text-[#68778D]" />
              ) : (
                <HeartFilledIcon className="w-6 h-6 text-[#ff0000] " />
              )}
            </div>
            <button
              onClick={() => {
                setopenLikedModal(!openLikedModal);
              }}
              className={` ${
                openLikedModal && "bg-gray-200"
              }  flex items-center rounded-xl p-4 border-[1px] border-[#CBD5E0]`}
            >
              <EllipsisHorizontalIcon className="w-6 h-6 " />
            </button>
            {openLikedModal && (
              <div className="absolute  bg-white rounded-xl top-16 -right-16 sm:right-0 w-[200px] py-3 px-8  border-[1px] border-[#e5e8ed]">
                <button onClick={() => setIsLiked(!isLiked)} className="flex gap-4 items-center">
                  {isLiked ? (
                    <HeartIcon className="w-6 h-6 text-[#68778D]" />
                  ) : (
                    <HeartFilledIcon className="w-6 h-6 text-[#ff0000] " />
                  )}
                  <p>Like</p>
                </button>
                <button className="flex gap-4 items-center">
                  <ArrowUturnRightIcon className="w-6 h-6 text-[#68778D]" />
                  <p>Share</p>
                </button>
                <button className="flex gap-4 items-center">
                  <FlagIcon className="w-6 h-6 text-[#68778D]" />
                  <p>Report</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 ">
          <span className="text-[#47556a]">created by</span>
          <Address address="0xf4030DdD79fc7Fd49b25C976C5021D07568B4F91" />
        </div>
        <div className="mt-8">
          <h4 className="text-[#68778D] text-lg">🧑‍💻 ABOUT</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic soluta provident alias nostrum in
            aspernatur modi, ipsam atque aperiam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic soluta provident alias nostrum in
            aspernatur modi, ipsam atque aperiam?
          </p>
        </div>
        <div className="mt-8">
          <h4 className="text-[#68778D] text-lg">📊 IMPACT EVALUATION</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic soluta provident alias nostrum in
            aspernatur modi, ipsam atque aperiam?
          </p>
          <button className="grid grid-flow-col w-fit items-center rounded-full px-4 gap-2 border-[1px] border-[#CBD5E0] ">
            <div className="rounded-full p-1 bg-[#E2E8F0]">
              <DocumentIcon className="w-6 h-6 text-[#68778D]" />
            </div>
            <p className=" ">impact Evaluation</p>
            <ArrowTopRightOnSquareIcon className="text-[#68778D] w-6 h-6" />
          </button>
        </div>

        <div className="mt-16">
          <ProjectList projectData={projectData} />
          <SuggestProjects />
        </div>
      </div>
    </div>
  );
};

export default Project;
