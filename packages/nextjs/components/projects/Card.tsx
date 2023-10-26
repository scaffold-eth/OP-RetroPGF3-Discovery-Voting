import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddProjectButton from "../op/btn/AddProjectButton";
import VoteModal from "../op/modals/VoteModal";
import { Project } from "~~/context/BallotContext";
import logo from "~~/public/assets/Logo.png";

// import banner from "~~/public/assets/gradient-bg.png";

const Card = ({ project, display }: { project: Project; display: any }) => {
  const { name, ownerName, bio, impactCategory, bannerImageUrl, profileImageUrl } = project;

  return (
    <div>
      {display === "grids" ? (
        <div className="project__card-container rounded-[1.5em] p-2 bg-base-100 border-gray-300 border ">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            {bannerImageUrl ? (
              <div className="max-h-[112px] rounded-[1.05em] overflow-hidden">
                <Image
                  width={311}
                  height={112}
                  className="rounded-[1.05em] object-contain w-full h-full"
                  src={bannerImageUrl}
                  alt="banner"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-full h-[112px] rounded-[1.05em] bg-gray-300"></div>
            )}

            <Image
              width={54}
              height={54}
              className="mt-[-22px] object-contain ml-[20px] border-4 w-[54px] h-[54px] bg-white border-white  rounded-[1.05em] inline-block   "
              src={profileImageUrl ? profileImageUrl : logo}
              alt="logo"
            />
          </div>

          <div className="flex items-center">
            <div className="flex-1 truncate">
              <Link href={`/projects/${project._id}`} className="truncate">
                <p className="truncate text-[18px] font-bold leading-[28px] mb-0 mt-2">{name}</p>
              </Link>
              <div className="flex items-center">
                <p className="font-semibold leading-[0px]  text-sm  ">{ownerName}</p>
              </div>
            </div>
          </div>

          <p className="text-lightGray text-[14px] font-normal leading-5  mt-0 truncate">{bio}</p>
          <div className=" project__card-container_btn py-2">
            <span className="px-2 py-1 text-[0.75rem] text-base-content-100 bg-base-200 rounded-md mr-2">
              {" "}
              {impactCategory[0]}
            </span>
            <AddProjectButton project={project} customClass="card-btn " />
          </div>
        </div>
      ) : (
        <div className="flex border rounded-[1.5rem] border-gray-300   p-4 ">
          <div>
            <Image
              width={74}
              height={74}
              className="border-4 border-white  bg-white rounded inline-block w-[74px] h-[74px] object-contain "
              src={profileImageUrl ? profileImageUrl : logo}
              alt="logo"
            />
          </div>
          <div className="ml-6 w-full">
            <p className="text-[18px] font-bold leading-[28px] mb-0 mt-0">{name}</p>

            <p className="text-lightGray text-[14px] font-normal leading-5 my-0 ">{bio} Web3 Explorer</p>
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-1 ">
              <span className="w-fit px-2 py-1 text-sm text-customGray bg-customWhite rounded-md mr-2">
                {" "}
                {impactCategory[0]} Collective Govenaces
              </span>
              <div className="w-fit">
                <AddProjectButton project={project} customClass="card-btn" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
