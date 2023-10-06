import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "~~/public/assets/Logo.png";

// import banner from "~~/public/assets/gradient-bg.png";

const Card = ({ project, display }: any) => {
  const { name, username, banner, description, category } = project;
  return (
    <div>
      <Link href={`/projects/${project._id}`}>
        {display === "grids" ? (
          <div className=" p-2 border rounded-[1.05em] border-gray-300 bg-base-100">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              {banner ? (
                <Image
                  width={311}
                  height={112}
                  className="rounded-[1.05em] object-fill w-full h-full"
                  src={banner}
                  alt="banner"
                />
              ) : (
                <div className="flex-shrink-0 w-full h-[112px] rounded-[1.05em] bg-gray-300"></div>
              )}
              <Image
                width={54}
                height={54}
                className="mt-[-22px] ml-[20px] border-4 border-white bg-base-100 rounded-[1.05em] inline-block"
                src={logo}
                alt="logo"
              />
            </div>
            <div className="flex items-center">
              <div className="flex-1 truncate">
                <p className="truncate text-[18px] font-bold leading-[28px] mb-0 mt-2">{name}</p>
                <div className="flex items-center">
                  <p className="font-semibold leading-[0px]  text-sm  ">{username}</p>
                </div>
              </div>
            </div>

            <p className="text-lightGray text-[14px] font-normal leading-5  mt-0 truncate">{description}</p>
            <div className="flex items-center justify-between py-2">
              <span className="px-2 py-1 text-[0.75rem] text-base-content-100 bg-base-200 rounded-md mr-2">
                {" "}
                {category}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex border rounded-[1.5rem] border-gray-300 p-4">
            <Image
              width={54}
              height={54}
              className="border-4 border-white  bg-base-100 rounded inline-block w-[54px] h-[54px] "
              src={logo}
              alt="logo"
            />
            <div className="ml-6">
              <p className="text-[18px] font-bold leading-[28px] mb-0 mt-2">{name}</p>

              <p className="text-lightGray text-[14px] font-normal leading-5 ">{description}</p>
              <div className="flex items-center justify-between py-2">
                <span className="px-2 py-1 text-sm text-customGray bg-customWhite rounded-md mr-2"> {category} </span>
              </div>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default Card;
