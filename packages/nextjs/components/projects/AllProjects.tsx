import React, { useEffect, useState } from "react";
import Link from "next/link";
import ListHeader from "~~/components/lists/ListHeader";
import Pagination from "~~/components/lists/Pagination";
import Card from "~~/components/projects/Card";
import { ProjectDocument } from "~~/models/Project";

interface Props {
  projects: ProjectDocument[];
}

const AllProjects: React.FC<Props> = ({ projects }) => {
  const [display, setDisplay] = useState("grids");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allProjects, setAllProjects] = useState<ProjectDocument[]>(projects);
  const [filteredProjects, setFilteredProjects] = useState<ProjectDocument[]>(projects);
  const [shuffledProjects, setShuffledProjects] = useState<ProjectDocument[]>(projects);
  const totalPages = 5;

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const displayList = (option: string) => {
    setDisplay(option);
  };

  useEffect(() => {
    function filterProjects() {
      const _filteredProjects =
        selectedCategory === "all" ? allProjects : projects.filter(project => project.category === selectedCategory);
      setFilteredProjects(_filteredProjects);
    }
    filterProjects();
  }, [selectedCategory, allProjects]);

  useEffect(() => {
    setAllProjects(shuffledProjects);
  }, [shuffledProjects]);

  return (
    <div>
      <div className="container mx-auto">
        <ListHeader
          displayList={displayList}
          titleHeader="Projects"
          display={display}
          onCategoryChange={setSelectedCategory}
          projects={allProjects}
          onShuffleProjects={setShuffledProjects}
        />
        <div
          className={`px-4 grid pt-8 gap-4 ${
            display == "grids" ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" : "grid-rows-1 w-full"
          } `}
        >
          {filteredProjects.map(project => (
            <Link key={project._id} href={`projects/${project._id}`}>
              <Card project={project} display={display} />
            </Link>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default AllProjects;