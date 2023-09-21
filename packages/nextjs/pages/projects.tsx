import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import YourBallot from "~~/components/op/projects/YourBallot";
import AllProjects from "~~/components/projects/AllProjects";
import Sidebar from "~~/components/shared/Sidebar";
import { useProjects } from "~~/context/ProjectsContext";

const Projects = () => {
  const { projects } = useProjects();
  const { isDisconnected } = useAccount();
  const [wallet, setWallet] = useState<boolean | false>(false);

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  if (projects.length < 1) {
    return (
      <div className="text-center font-bold text-2xl pt-8">
        <h1>No projects available...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-12 mt-12 flex flex-col md:flex-row gap-4">
      {!wallet ? <YourBallot /> : <Sidebar />}
      <AllProjects projects={projects} />
    </div>
  );
};

export default Projects;
