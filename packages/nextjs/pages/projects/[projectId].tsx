import React, { useState }from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { HeartIcon as HeartFilledIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import SuggestProjects from "~~/components/shared/SuggestProjects";
import { useBallot } from "~~/context/BallotContext";
import dbConnect from "~~/lib/dbConnect";
import Project, { ProjectDocument } from "~~/models/Project";

interface Props {
  projects: ProjectDocument[];
}

const ProjectDetail: NextPage<Props> = ({ projects }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
  // const [tokenAllocation, setTokenAllocation] = useState(0); // Manage token allocation
  const { dispatch } = useBallot(); // Access dispatch from ballot context

  const addProjectToBallot = () => {
    dispatch({
      type: "ADD_PROJECT",
      project: {
        id: projects[0]._id,
        name: projects[0].name,
        allocation: 0,
      },
    });
    // setIsModalOpen(false);
  };
  return (
    <div className=" mx-auto px-12 mt-12 grid gap-12">
      <div className="">
        <div className="grid mb-3 sm:grid-flow-col items-center">
          <h3 className="text-2xl font-bold">{projects[0].name}</h3>
          <div className="grid grid-flow-col gap-4 w-fit sm:w-full sm:justify-end relative">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className=" flex items-center gap-1 rounded-xl p-4 border-[1px] border-[#CBD5E0]"
            >
              <span>12</span>
              {isLiked ? (
                <HeartIcon className="w-6 h-6  text-[#68778D]" />
              ) : (
                <HeartFilledIcon className="w-6 h-6 text-[#ff0000] " />
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-2 ">
          <span className="text-[#47556a]">Payout Address:</span>
          <strong>
            <Address address={projects[0].payoutAddress} />
          </strong>
        </div>
        <div className="badge badge-warning mt-3">{projects[0].category}</div>
        <div className="mt-8">
          <h4 className="text-[#68778D] text-lg">🧑‍💻 Description</h4>
          <p>{projects[0].description}</p>
          <button onClick={() => addProjectToBallot()} className="p-2 bg-blue-500 text-white rounded">
            Add to Ballot
          </button>
          {/* Modal */}
          {/* {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded">
                <h4>Enter Token Allocation</h4>
                <input
                  type="number"
                  value={tokenAllocation}
                  onChange={e => setTokenAllocation(Number(e.target.value))}
                  className="border rounded p-1 w-full"
                />
                <div className="flex justify-end mt-2">
                  <button onClick={addProjectToBallot} className="bg-green-500 text-white p-2 rounded">
                    Add to Ballot
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="text-red-500 ml-2">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
        <div className="mt-16">
          <SuggestProjects />
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
