import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import * as solid from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import SharedProjects from "~~/components/lists/SharedProjects";
import YourBallot from "~~/components/op/projects/YourBallot";
import { Address } from "~~/components/scaffold-eth";
import SuggestProjects from "~~/components/shared/SuggestProjects";
import { useSuggestedProjects } from "~~/hooks/scaffold-eth/useSuggestedProjects";
import dbConnect from "~~/lib/dbConnect";
import List from "~~/models/List";
import { IList } from "~~/types/list";
import { populateListProjects } from "~~/utils/populateListProjects";

interface Props {
  list: IList;
}

const ListDetail: NextPage<Props> = ({ list }) => {
  const [openLikedModal, setopenLikedModal] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const tempCategory = list.tags ? list?.tags[0] : undefined;
  // const firstLetter = tempCategory ? tempCategory[0] : undefined;
  // const category = tempCategory ? tempCategory[0].toUpperCase() : "" + tempCategory ? tempCategory?.slice(1) : "";
  const category = tempCategory && tempCategory[0]?.toUpperCase() + tempCategory?.slice(1);
  const currentProjectId = list._id;
  const { suggestedProjects } = useSuggestedProjects(category, currentProjectId);
  return (
    <div className=" mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-12">
      <YourBallot />
      <div className="">
        <div className="grid mb-3 sm:grid-flow-col items-center">
          <h3 className="text-2xl font-bold">{list.name}</h3>
          <div className="grid grid-flow-col gap-4 w-fit sm:w-full sm:justify-end relative">
            <div className=" flex items-center gap-1 rounded-xl p-4 border-[1px] border-[#CBD5E0]">
              <span>12</span>
              {isLiked ? (
                <HeartIcon className="w-6 h-6  text-[#68778D]" />
              ) : (
                <solid.HeartIcon className="w-6 h-6 text-[#ff0000] " />
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
              <solid.EllipsisHorizontalIcon className="w-6 h-6 " />
            </button>
            {openLikedModal && (
              <div className="absolute  bg-white rounded-xl top-16 -right-16 sm:right-0 w-[200px] py-3 px-8  border-[1px] border-[#e5e8ed]">
                <button onClick={() => setIsLiked(!isLiked)} className="flex gap-4 items-center">
                  {isLiked ? (
                    <HeartIcon className="w-6 h-6 text-[#68778D]" />
                  ) : (
                    <solid.HeartIcon className="w-6 h-6 text-[#ff0000] " />
                  )}
                  <p>Like</p>
                </button>
                <button className="flex gap-4 items-center">
                  <solid.ArrowUturnRightIcon className="w-6 h-6 text-[#68778D]" />
                  <p>Share</p>
                </button>
                <button className="flex gap-4 items-center">
                  <solid.FlagIcon className="w-6 h-6 text-[#68778D]" />
                  <p>Report</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 ">
          <span className="text-[#47556a]">created by</span>
          <Address address={list.creator} />
        </div>
        <div className="mt-8">
          <h4 className="text-[#68778D] text-lg">🧑‍💻 DESCRIPTION</h4>
          <p>{list.description}</p>
        </div>
        <div className="mt-8">
          <h4 className="text-[#68778D] text-lg">📊 IMPACT EVALUATION</h4>
          <p>{list.impactEvaluation}</p>
          {/* <button className="grid grid-flow-col w-fit items-center rounded-full px-4 gap-2 border-[1px] border-[#CBD5E0] ">
            <div className="rounded-full p-1 bg-[#E2E8F0]">
              <DocumentIcon className="w-6 h-6 text-[#68778D]" />
            </div>
            <p className=" ">impact Evaluation</p>
            <ArrowTopRightOnSquareIcon className="text-[#68778D] w-6 h-6" />
          </button> */}
        </div>

        <div className="mt-16">
          <SharedProjects list={list} />
          <SuggestProjects suggestedProjects={suggestedProjects} />
        </div>
      </div>
    </div>
  );
};

export default ListDetail;

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    await dbConnect();
    const listId = context.query.listId;
    const list = await List.findById(listId);
    const newList = await populateListProjects(list);
    return { props: { list: JSON.parse(JSON.stringify(newList)) } };
  } catch (e) {
    console.log(e);
    return { props: { list: {} } }; // returns an empty obj if there's an error
  }
};
