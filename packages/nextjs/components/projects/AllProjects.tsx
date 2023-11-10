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
    mutate(`/api/projects?pageQuery=${pageNumber}&limit=${pageSize}&isShuffle=${false}`);
  };
  const displayList = (option: string) => {
    setDisplay(option);
  };

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  // useEffect hook to set filtered projects
  useEffect(() => {
    function filterProjects() {
      try {
        const _filteredProjects =
          selectedCategory === "all"
            ? allProjects
            : allProjects?.filter((project: IProject) => project.impactCategory.includes(selectedCategory));
        setFilteredProjects(_filteredProjects);
      } catch (e) {
        console.log("ERR::filterProjects::", e);
      }
    }
    filterProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, allProjects]);

  // useEffect hook to set `allProjects` to the shuffled projects
  useEffect(() => {
    if (isShuffle) {
      setTimeout(() => {
        setIsShuffle(false);
        setAllProjects(shuffledProjects);
      }, 2000);
    }
  }, [shuffledProjects, isShuffle]);

  // useEffect hook to set projects when a page change request is made via pagination component
  useEffect(() => {
    if (!projectsData) return;
    if (!shuffledProjects || !isShuffle) {
      setAllProjects(projectsData.projects);
      setTotalPages(projectsData.totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // useEffect hook to set all projects whenever a request to server is made i.e `isLoading` changes
  useEffect(() => {
    if (isLoading) return;
    setAllProjects(projectsData.projects);
    setTotalPages(projectsData.totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Display spinner if `isLoading === true` or no projects found
  if ((!allProjects && !shuffledProjects) || (allProjects && isLoading && !isShuffle)) {
    return (
      <div className="flex mt-8 pt-8 justify-center">
        <Spinner />
      </div>
    );
  }

  // Display this if no projects are found
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
          <div className="w-full">
            <ProjectsPageHeader
              displayList={displayList}
              titleHeader="Projects"
              display={display}
              onCategoryChange={setSelectedCategory}
              currentPage={currentPage}
              pageSize={pageSize}
              onShuffleProjects={setShuffledProjects}
              onIsShuffle={setIsShuffle}
            />
            <div
              className={`px-4 sm:px-0 grid pt-8 gap-4 ${
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
