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
import { Address } from "~~/components/scaffold-eth";

const userList = [
  {
    name: "DefiLlama",
    handle: "defillama",

    image: "/assets/gradient-bg.png",
    op: "20, 416",
  },
  {
    name: "L2BEAT",
    handle: "l2beat",
    image: "/assets/gradient-bg.png",
    op: "15, 416 ",
  },
  {
    name: "Polynya",
    handle: "polynya",
    image: "/assets/gradient-bg.png",
    op: "12, 416",
  },
  {
    name: "DefiLlama",
    handle: "defillama",

    image: "/assets/gradient-bg.png",
    op: "20, 416",
  },
  {
    name: "L2BEAT",
    handle: "l2beat",
    image: "/assets/gradient-bg.png",
    op: "15, 416 ",
  },
  {
    name: "Polynya",
    handle: "polynya",
    image: "/assets/gradient-bg.png",
    op: "12, 416",
  },
];
const Project = () => {
  const [likedModal, setLikedModal] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <div className=" mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-12">
      <div className="">
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
      <div className="">
        <div className="grid grid-flow-col items-center">
          <h3 className="text-2xl font-bold">Solarpunk Utopia Dream</h3>
          <div className="grid grid-flow-col gap-4 justify-end relative">
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
                setLikedModal(!likedModal);
              }}
              className="flex items-center rounded-xl p-4 border-[1px] border-[#CBD5E0]"
            >
              <EllipsisHorizontalIcon className="w-6 h-6 " />
            </button>
            {likedModal && (
              <div className="absolute  bg-gray-200 rounded-xl top-16 right-0 w-[200px] py-3 px-8  border-2 border-[#CBD5E0]">
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
          <h4 className="text-[#68778D] text-lg">📊 IMPACAT EVALUATION</h4>
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
          <ProjectList projectData={userList} />
        </div>
      </div>
    </div>
  );
};

export default Project;
