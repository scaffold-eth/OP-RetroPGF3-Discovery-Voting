import React, { useState } from "react";
import Link from "next/link";
import { getAllProjects } from "./projects/data";
import type { NextPage } from "next";
import ListHeader from "~~/components/lists/ListHeader";
import Pagination from "~~/components/lists/Pagination";
import Card from "~~/components/projects/Card";

interface ProjectLists {
  id: number;
  banner: string;
  logo: string;
  name: string;
  description: string;
  category: string;
  slug: string;
}

interface ProjectProps {
  projects: ProjectLists[];
}

const Projects: NextPage<ProjectProps> = ({ projects }) => {
  const [display, setDisplay] = useState("grids");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const totalPages = 5;

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const displayList = (option: string) => {
    setDisplay(option);
  };

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter(project => project.category === selectedCategory);

  return (
    <div>
      <div className="container mx-auto">
        <ListHeader
          displayList={displayList}
          titleHeader="Projects"
          display={display}
          onCategoryChange={setSelectedCategory}
        />
        <div
          className={`px-4 grid pt-8 gap-4 ${
            display == "grids" ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" : "grid-rows-1 w-full"
          } `}
        >
          {filteredProjects.map(project => (
            <Link key={project.id} href={`projects/${project.slug}`}>
              <Card project={project} display={display} />
            </Link>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const projects = getAllProjects();
  return {
    props: {
      projects,
    },
  };
}

export default Projects;
