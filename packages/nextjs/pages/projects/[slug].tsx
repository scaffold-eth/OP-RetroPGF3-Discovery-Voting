import { ProjectLists, getAllProjects } from "./data";
import { NextPage } from "next";

interface ProjectDetailProps {
  project: ProjectLists;
}

const ProjectDetail: NextPage<ProjectDetailProps> = ({ project }) => {
  return (
    <section>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </section>
  );
};

export async function getStaticPaths() {
  const projects = getAllProjects();
  const paths = projects.map(project => ({
    params: { slug: project.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const projects = getAllProjects();
  const project = projects.find(x => x.slug === params.slug);
  return {
    props: {
      project,
    },
  };
}

export default ProjectDetail;
