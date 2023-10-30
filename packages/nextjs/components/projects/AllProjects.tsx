import React, { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import Pagination from "../lists/Pagination";
import useSWR from "swr";
import { useAccount } from "wagmi";
import YourBallot from "~~/components/op/projects/YourBallot";
import Card from "~~/components/projects/Card";
import ProjectsPageHeader from "~~/components/projects/ProjectsPageHeader";
import Sidebar from "~~/components/shared/Sidebar";
import { Project } from "~~/context/BallotContext";
import { IProject } from "~~/models/Project";
import { fetcher } from "~~/utils/fetcher";

const AllProjects = () => {
  const { isDisconnected } = useAccount();
  const [wallet, setWallet] = useState<boolean | false>(false);
  const [display, setDisplay] = useState("grids");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: projectsData, isLoading } = useSWR(`/api/projects?pageQuery=${currentPage}&limit=12`, fetcher);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allProjects, setAllProjects] = useState<IProject[] | undefined>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[] | undefined>([]);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const displayList = (option: string) => {
    setDisplay(option);
  };

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  useEffect(() => {
    function filterProjects() {
      const _filteredProjects =
        selectedCategory === "all"
          ? allProjects
          : allProjects?.filter(project => project.impactCategory.includes(selectedCategory));
      setFilteredProjects(_filteredProjects);
    }
    filterProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, allProjects]);

  useEffect(() => {
    if (!projectsData) return;
    setTotalPages(projectsData.totalPages);
    setAllProjects(projectsData.projects);
  }, [projectsData]);

  if (allProjects && allProjects.length === 0 && isLoading) {
    return (
      <div className="flex mt-8 pt-8 justify-center">
        <Spinner />
      </div>
    );
  }

  if (allProjects && allProjects.length === 0) {
    return (
      <div className="text-center font-bold text-2xl pt-8">
        <h1>No projects available...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto px-12 mt-12 grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-4">
      {!wallet ? <YourBallot /> : <Sidebar />}
      <div>
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="container  mx-auto">
            <ProjectsPageHeader
              displayList={displayList}
              titleHeader="Projects"
              display={display}
              onCategoryChange={setSelectedCategory}
              projects={allProjects}
              onShuffleProjects={setAllProjects}
            />

            <div
              className={`px-4 grid pt-8 gap-4 ${
                display == "grids" ? "w-full project__card-container " : "grid-rows-1 w-full"
              } `}
            >
              {filteredProjects?.map(project => (
                <Card key={project._id} project={project} display={display} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
