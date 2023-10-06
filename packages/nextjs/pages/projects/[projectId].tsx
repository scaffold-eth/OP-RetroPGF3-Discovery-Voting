import React from "react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { AiOutlineGithub } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { IoMdOpen } from "react-icons/io";
import { useAccount } from "wagmi";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import YourBallot from "~~/components/op/projects/YourBallot";
import ProjectHeader from "~~/components/project/ProjectHeader";
import Sidebar from "~~/components/shared/Sidebar";
import SuggestProjects from "~~/components/shared/SuggestProjects";
import { useSuggestedProjects } from "~~/hooks/scaffold-eth/useSuggestedProjects";
import dbConnect from "~~/lib/dbConnect";
import Project, { ProjectDocument } from "~~/models/Project";

interface Props {
  projects: ProjectDocument[];
}

const ProjectDetail: NextPage<Props> = ({ projects }) => {
  const { isConnected } = useAccount();
  // TODO: Add these entries to the database for each document and pull from there
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

  const category = projects.length > 0 ? projects[0].category : undefined;
  const currentProjectId = projects[0]._id;
  const { suggestedProjects } = useSuggestedProjects(category, currentProjectId);

  const project = projects[0];
  return (
    <div className="bg-base-100 mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-4 pb-16">
      {isConnected ? <YourBallot /> : <Sidebar />}
      <div className="">
        <ProjectHeader project={project} />

        <div className=" mt-8 mb-8 border-t border-gray-200 w-full"></div>
        <div className="">
          <section id="about">
            <h3 className="font-medium text-[#68778D] text-xl leading-7 uppercase">👨‍💻 About</h3>
            <p className="font-normal leading-6  text-based">{project ? project.description : ""}</p>
          </section>

          <section id="categories">
            <h4 className="font-medium text-xs text-[#68778D] leading-4 tracking-tighter pt-2  uppercase">
              Categories
            </h4>
            <div className="flex items-center py-2">
              <span className="px-4 py-2 text-sm text-customGray bg-customWhite rounded-md mr-2"> OP Stack </span>
              <span className="px-4 py-2 text-sm text-customGray bg-customWhite rounded-md mr-2">
                {project.category}
                {/* TODO: need to change db documents to have "categories" array and map them all here */}
              </span>
            </div>
          </section>

          <section id="contribution">
            <h3 className="pt-8 font-medium text-xl text-[#68778D] leading-7 uppercase">🧬 Contribution</h3>
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
            <h3 className="pt-8 mb-4 font-medium text-[#68778D] text-xl leading-7 uppercase">📊 Impact</h3>
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
          <div className="mt-16">
            <SuggestProjects suggestedProjects={suggestedProjects} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    await dbConnect();
    const projectId = context.query.projectId;
    const projects: ProjectDocument[] = await Project.find({ _id: projectId });
    return { props: { projects: JSON.parse(JSON.stringify(projects)) } };
  } catch (e) {
    console.log(e);
    return { props: { projects: [] } }; // returns an empty array if there's an error
  }
};
