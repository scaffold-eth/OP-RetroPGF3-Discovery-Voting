import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import AllProjects from "~~/components/projects/AllProjects";
import dbConnect from "~~/lib/dbConnect";
import Project, { ProjectDocument } from "~~/models/Project";

interface ProjectProps {
  projects: ProjectDocument[];
}

const Projects: NextPage<ProjectProps> = ({ projects }) => {
  if (projects.length < 1)
    return (
      <div className="text-center">
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

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    await dbConnect();
    const projects: ProjectDocument[] = await Project.find({});
    return { props: { projects: JSON.parse(JSON.stringify(projects)) } };
  } catch (e) {
    console.log(e);
    return { props: { projects: [] } }; // returns an empty array if there's an error
  }
};
