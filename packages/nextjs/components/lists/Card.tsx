import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "../Spinner";
import AddListButton from "../op/btn/AddListButton";
import { Address } from "../scaffold-eth";
import { useAccount } from "wagmi";
import { HeartIcon as HeartFilledIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { IProject } from "~~/models/Project";
import { IList } from "~~/types/list";
import { humanize } from "~~/utils/humanize";

const Card = ({ list, onLike, isLoading, loadingList }: any) => {
  const { address } = useAccount();
  const { name, creator, projects, likes, description, tags } = list;
  const isLiked = likes.includes(address);
  const [populatedList, setPopulatedList] = useState<IList | undefined>();

  const loadListProjectsData = async () => {
    const response = await fetch("/api/projects");
    const _projects = await response.json();
    let _sharedProject = {};
    const _populatedSharedProjects = [];
    for (let i = 0; i < list.projects.length; i++) {
      const projectId = list.projects[i].project;
      const [p] = _projects.filter((project: IProject) => project._id === projectId);
      const projectAllocation = list.projects[i].allocation;
      _sharedProject = {
        id: p._id,
        name: p.name,
        allocation: projectAllocation,
        listId: list._id,
      };
      _populatedSharedProjects.push(_sharedProject);
    }
    return { ...list, populatedProjects: _populatedSharedProjects };
  };

  useEffect(() => {
    if (!list) return;
    const populateList = async () => {
      const data = await loadListProjectsData();
      setPopulatedList(data);
    };
    populateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <div className=" w-full h-60 border rounded-lg border-gray-300  p-4 ">
      <div className="flex items-center">
        <div className="flex-1">
          <div>
            <Link key={list._id} href={`lists/${list._id}`} className="">
              <p className="text-[18px] w-full max-w-[200px] truncate  font-bold leading-[28px] mb-0 mt-2 ">{name}</p>
            </Link>
          </div>
          {/* <div className="flex items-center">
              <Image width={22} height={22} className="mr-2" src={""} alt="Avatar" />
            </div> */}
          <div className="flex items-center">
            <p className="font-semibold leading-[0px] text-sm mr-4">Creator: </p>
            <Address address={creator} />
          </div>
        </div>

        <div className="flex items-center">
          {likes.length > 0 && (
            <p className="text-lightGray text-sm leading-4 font-normal text-right  mr-2">{likes.length}</p>
          )}
          <button
            className={`${
              isLoading && list._id === loadingList ? "loading" : ""
            } btn btn-circle btn-sm bg-transparent border-none shadow-none hover:bg-transparent`}
            onClick={() => onLike()}
          >
            {list._id === loadingList && isLoading ? null : isLiked ? (
              <HeartFilledIcon className={`w-6 h-6 text-[#ff0000]`} />
            ) : (
              <HeartIcon className={`w-6 h-6  text-[#68778D]`} />
            )}
          </button>
        </div>
      </div>

      <div className="relative flex items-center">
        <Image
          width={28}
          height={28}
          className="rounded border border-OPlightgray outline-white "
          src="/assets/Logo Container.png"
          alt="Avatar"
        />
        <Image
          width={28}
          height={28}
          className="rounded border border-OPlightgray outline-white outline-2 z-1 ml-[-5px]"
          src="/assets/Logo.png"
          alt="Avatar"
        />
        <Image
          width={28}
          height={28}
          className="rounded border border-OPlightgray outline-white outline-2 z-2 ml-[-8px]"
          src="/assets/Logo1.png"
          alt="Avatar"
        />
        <Image
          width={28}
          height={28}
          className="rounded border border-OPlightgray outline-white outline-2 z-3 ml-[-10px]"
          src="/assets/Logo2.png"
          alt="Avatar"
        />
        <p className="ml-12 font-normal text-lightGray leading-[16px] ">
          {projects.length > 10 ? "+" : ""}
          {projects.length} projects
        </p>
      </div>
      <p className="text-lightGray text-[14px] font-normal leading-5  mt-0 truncate">{description}</p>
      <div className="flex items-center justify-between py-2">
        {tags && tags.length > 0 ? (
          <div className="flex">
            <span className="px-2 py-1 text-sm text-customGray bg-customWhite rounded-md mr-2">
              {" "}
              {humanize(tags[0])}{" "}
            </span>
            {tags.length > 1 && (
              <span className="px-2 py-1 text-sm text-customGray bg-customWhite rounded-md mr-2">
                +{tags.length - 1}
              </span>
            )}
          </div>
        ) : (
          ""
        )}
        {populatedList ? <AddListButton list={populatedList} customClass="card-btn" /> : <Spinner />}
      </div>
    </div>
  );
};

export default Card;
