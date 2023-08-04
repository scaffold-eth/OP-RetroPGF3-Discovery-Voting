import React, { useEffect, useState } from "react";
import { IoMdOpen } from "react-icons/Io";
import { AiOutlineGithub } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { useAccount } from "wagmi";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import YourBallot from "~~/components/op/projects/YourBallot";
import Card from "~~/components/project/Card";
import { ProjectHeader } from "~~/components/project/ProjectHeader";
import Sidebar from "~~/components/shared/Sidebar";

const Project = () => {
  const { isDisconnected } = useAccount();
  const [wallet, setWallet] = useState<boolean | false>(false);
  const data = [
    {
      id: 1,
      name: "List 1",
      user_avatar: "/assets/Img.png",
      username: "verycoolperson",
      likes: 12,
      projects_icon: 21,
      projects: 21,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      tags: ["Category name", "category1", "category2"],
      opAmount: "36,000 OP",
    },
    {
      id: 2,
      name: "List 2",
      user_avatar: "/assets/Img.png",
      username: "anothercoolperson",
      likes: 8,
      projects_icon: 15,
      projects: 15,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      tags: ["Category name", "category1", "category2"],
      opAmount: "36,000 OP",
    },
    {
      id: 3,
      name: "List 3",
      user_avatar: "/assets/Img.png",
      username: "user3",
      likes: 20,
      projects_icon: 5,
      projects: 5,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      tags: ["Category name", "category3", "category4"],
      opAmount: "36,000 OP",
    },
    {
      id: 4,
      name: "List 4",
      user_avatar: "/assets/Img.png",
      username: "user4",
      likes: 5,
      projects_icon: 8,
      projects: 8,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
      tags: ["Category name", "category5", "category6"],
      opAmount: "36,000 OP",
    },
  ];

  const impactArray = [
    {
      id: 1,
      name: "Tx Supported",
      amount: "1.39M",
    },
    {
      id: 2,
      name: "total tx amount",
      amount: "$500M",
    },
    {
      id: 3,
      name: "Total Downloads",
      amount: "500",
    },
  ];

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  return (
    <div className="mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-4 pb-16">
      {!wallet ? <YourBallot /> : <Sidebar />}
      <div className="">
        <ProjectHeader />

        <div className=" mt-8 mb-8 border-t border-gray-200 w-full"></div>
        <div className="">
          <section id="about">
            <h3 className="font-medium text-xl leading-7">👨‍💻 About</h3>
            <p className="font-normal leading-6  text-based">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd
            </p>
            <p className="font-normal leading-6 text-based">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd
            </p>
          </section>

          <section id="categories">
            <h4 className="font-medium text-xs leading-4 tracking-tighter pt-2  uppercase">Categories</h4>
            <div className="flex items-center py-2">
              <span className="px-4 py-2 text-sm text-customGray bg-customWhite rounded-md mr-2"> OP Stack </span>
              <span className="px-4 py-2 text-sm text-customGray bg-customWhite rounded-md mr-2">
                End User Experience and Adoption
              </span>
            </div>
          </section>

          <section id="contribution">
            <h3 className="pt-8 font-medium text-xl leading-7">🧬 Contribution</h3>
            <p className="font-normal leading-6 text-based">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd
            </p>
            <p className="font-normal leading-6 text-based">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd
            </p>

            <div className="flex items-center py-2 gap-2 flex-wrap">
              <button className="flex items-center rounded-full  border border-neutral px-3 py-1 space-x-2">
                <AiOutlineGithub />
                <span className="text-based ">Github</span>
                <IoMdOpen />
              </button>

              <button className="flex items-center rounded-full  border border-neutral px-3 py-1 space-x-2">
                <BsGlobe />
                <span className="text-based ">Example 31</span>
                <IoMdOpen />
              </button>

              <button className="flex items-center rounded-full  border border-neutral px-3 py-1 space-x-2">
                <BsGlobe />
                <span className="text-based ">Example #2</span>
                <IoMdOpen />
              </button>

              <button className="flex items-center rounded-full  border border-neutral px-3 py-1 space-x-2">
                <BsGlobe />
                <span className="text-based ">Example #2</span>
                <IoMdOpen />
              </button>
            </div>
          </section>

          <section id="impact">
            <h3 className="pt-8 mb-4 font-medium text-xl leading-7">📊 Impact</h3>
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              {impactArray.length > 0 ? (
                impactArray.map(record => (
                  <div className="border rounded-xl border-gray-300 sm:w-[163px] w-full " key={record.id}>
                    <div className="flex items-center justify-center space-x-2 mb-[px]">
                      <p className="font-medium text-xs leading-4 uppercase">{record.name}</p>
                      <ArrowTopRightOnSquareIcon className="w-[20px]" />
                    </div>
                    <p className="flex items-center justify-center  font-semibold text-lg leading-7 mt-[-10px]">
                      {record.amount}
                    </p>
                  </div>
                ))
              ) : (
                <h3>No Data Records Yet.</h3>
              )}
            </div>

            <p className="font-normal leading-6 text-based">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd
            </p>
            <p className="font-normal leading-6 text-based">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd
            </p>
          </section>
        </div>
        <div className="">
          <h3 className="font-semibold font-3xl leading-4 pb-4">Included in the following lists</h3>
          {data.map(project => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
