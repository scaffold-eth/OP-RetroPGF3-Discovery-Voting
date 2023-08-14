import React from "react";
import AllProjects from "~~/components/projects/AllProjects";
import { useProjects } from "~~/context/ProjectsContext";

const Projects = () => {
  const { projects } = useProjects();

  if (projects.length < 1)
    return (
      <div className="text-center font-bold text-2xl pt-8">
        <h1>No projects available...</h1>
      </div>
    );
  return (
    <div>
      <AllProjects projects={projects} />
    </div>
  );
};

export default Projects;
