import React, { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import Pagination from "../lists/Pagination";
import useSWR from "swr";
import { useAccount } from "wagmi";
import YourBallot from "~~/components/op/projects/YourBallot";
import Card from "~~/components/projects/Card";
import ProjectsPageHeader from "~~/components/projects/ProjectsPageHeader";
import Sidebar from "~~/components/shared/Sidebar";
import { IProject } from "~~/models/Project";
import { fetcher } from "~~/utils/fetcher";

const AllProjects = () => {
  const { isDisconnected } = useAccount();
  const [wallet, setWallet] = useState<boolean | false>(false);
  const [display, setDisplay] = useState("grids");
  const [currentPage, setCurrentPage] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const pageSize = 12;

  const {
    data: projectsData,
    isLoading,
    mutate,
  } = useSWR(`/api/projects?pageQuery=${currentPage}&limit=${pageSize}&isShuffle=${isShuffle}`, fetcher);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allProjects, setAllProjects] = useState<IProject[] | undefined>([]);
  const [shuffledProjects, setShuffledProjects] = useState<IProject[] | undefined>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[] | undefined>([]);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    mutate(`/api/projects?pageQuery=${pageNumber}&limit=${pageSize}`);
  };
  const displayList = (option: string) => {
    setDisplay(option);
  };

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  useEffect(() => {
    function filterProjects() {
      try {
        const _filteredProjects =
          selectedCategory === "all"
            ? allProjects
            : allProjects?.filter(project => project.impactCategory.includes(selectedCategory));
        setFilteredProjects(_filteredProjects);
      } catch (e) {
        console.log("ERR::filterProjects::", e);
      }
    }
    filterProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, allProjects]);

  useEffect(() => {
    if (!projectsData) return;
    if (isShuffle) {
      setTimeout(() => {
        setIsShuffle(false);
        setAllProjects(shuffledProjects);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsData, isShuffle]);

  useEffect(() => {
    if (!projectsData) return;
    if (!shuffledProjects || !isShuffle) {
      setAllProjects(projectsData.projects);
      setTotalPages(projectsData.totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (isLoading) return;
    setAllProjects(projectsData.projects);
    setTotalPages(projectsData.totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if ((!allProjects && !shuffledProjects) || (allProjects && isLoading && !isShuffle)) {
    return (
      <div className="flex mt-8 pt-8 justify-center">
        <Spinner />
      </div>
    );
  }

  if (allProjects && allProjects.length === 0 && !shuffledProjects) {
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
        {isShuffle || isLoading ? (
          <div className="container mx-auto">
            <ProjectsPageHeader
              displayList={displayList}
              titleHeader="Projects"
              display={display}
              onCategoryChange={setSelectedCategory}
              projects={allProjects}
              currentPage={currentPage}
              pageSize={pageSize}
              onShuffleProjects={setShuffledProjects}
              onIsShuffle={setIsShuffle}
            />
            <div className="flex justify-center mt-4 py-5 b-5">
              <Spinner />
            </div>
          </div>
        ) : (
          <div className="container  mx-auto">
            <ProjectsPageHeader
              displayList={displayList}
              titleHeader="Projects"
              display={display}
              onCategoryChange={setSelectedCategory}
              projects={allProjects}
              currentPage={currentPage}
              pageSize={pageSize}
              onShuffleProjects={setShuffledProjects}
              onIsShuffle={setIsShuffle}
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
