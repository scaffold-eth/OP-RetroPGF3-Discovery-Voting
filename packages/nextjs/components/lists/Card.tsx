import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";

const Card = ({ project }: any) => {
  const { name, user_avatar, username, likes, description, tags } = project;
  return (
    <div className="w-full">
      <div className="border rounded-lg border-gray-300  p-4 ">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-[18px] font-bold leading-[28px] mb-0 mt-2">{name}</p>

            <div className="flex items-center">
              <Image width={22} height={22} className="mr-2" src={user_avatar} alt="Avatar" />
              <p className="font-semibold leading-[0px]  text-sm  ">{username}</p>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-lightGray text-sm leading-4 font-normal text-right  mr-2">{likes}</p>
            <HeartIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="relative flex items-center">
          <Image
            width={28}
            height={28}
            className="rounded border border-[#E2E8F0] outline-white "
            src="/assets/Logo Container.png"
            alt="Avatar"
          />
          <Image
            width={28}
            height={28}
            className="rounded border border-[#E2E8F0] border-2  outline-white outline-2 z-1 ml-[-5px]"
            src="/assets/Logo.png"
            alt="Avatar"
          />
          <Image
            width={28}
            height={28}
            className="rounded border border-[#E2E8F0] border-2  outline-white outline-2 z-2 ml-[-8px]"
            src="/assets/Logo1.png"
            alt="Avatar"
          />
          <Image
            width={28}
            height={28}
            className="rounded border border-[#E2E8F0] border-2  outline-white outline-2 z-3 ml-[-10px]"
            src="/assets/Logo2.png"
            alt="Avatar"
          />
          <p className="ml-12 font-normal text-lightGray leading-[16px] ">+21 projects</p>
        </div>
        <p className="text-lightGray text-[14px] font-normal leading-5  mt-0">{description}</p>
        <div className="flex items-center justify-between py-2">
          {tags.length > 0 ? (
            <div className="flex">
              <span className="px-2 py-1 text-sm text-customGray bg-customWhite rounded-md mr-2"> {tags[0]} </span>
              <span className="px-2 py-1 text-sm text-customGray bg-customWhite rounded-md mr-2"> +{tags.length} </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
