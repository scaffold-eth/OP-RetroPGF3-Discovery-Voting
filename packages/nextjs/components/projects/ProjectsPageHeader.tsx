import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { ArrowsUpDownIcon, HeartIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { IProject } from "~~/models/Project";
import { fetcher } from "~~/utils/fetcher";
import { humanize } from "~~/utils/humanize";
import { shuffle } from "~~/utils/shuffle";

type CategoryInfo = {
  category: string;
  projectsCount: number;
};

function ProjectsPageHeader({
  displayList,
  titleHeader,
  display,
  onCategoryChange,
  onShuffleProjects,
  onIsShuffle,
  currentPage,
  pageSize,
}: any) {
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  const { data: fetchAllProjects } = useSWR(`/api/projects/`, fetcher, {
    revalidateIfStale: false,
  });
  const [fetchedProjects, setFetchedProjects] = useState<IProject[] | undefined>([]);

  useEffect(() => {
    const readyFetchedProjects = () => {
      setFetchedProjects(fetchAllProjects);
    };
    readyFetchedProjects();
  }, [fetchAllProjects]);

  function shuffleProjects() {
    try {
      if (!fetchedProjects) return;
      onCategoryChange("all");
      const shuffledProjects = shuffle(fetchedProjects);
      const skip = (currentPage - 1) * pageSize;
      // Apply pagination to the shuffled projects and limit the results to pageSize
      const paginatedShuffledProjects = shuffledProjects.slice(skip, skip + pageSize).slice(0, pageSize);
      onShuffleProjects(paginatedShuffledProjects);
    } catch (e) {
      console.log("shuffleProjects::ERR", e);
    }
  }

  const handleButtonClick = (options: string) => {
    let selectedOption = options;
    if (active === options) selectedOption = "all";
    setActive(selectedOption);
    onCategoryChange(selectedOption);
  };

  const handleShuffle = async () => {
    onIsShuffle(true);
    shuffleProjects();
  };

  useEffect(() => {
    try {
      function getCategories(projects: IProject[]): CategoryInfo[] {
        if (!projects) return [];
        const recordedCategories = new Set<string>();
        const categoryCount: Record<string, number> = {};

        projects.forEach((project: IProject) => {
          for (const category of project.impactCategory) {
            if (recordedCategories.has(category)) {
              categoryCount[category]++;
            } else {
              recordedCategories.add(category);
              categoryCount[category] = 1;
            }
          }
        });

        return Array.from(recordedCategories).map(category => ({
          category: category,
          projectsCount: categoryCount[category],
        }));
      }
      setCategories(getCategories(fetchAllProjects));
    } catch (e) {
      console.log("ERR_SETTING_CATEGORIES", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect hook to reset selected category when page changes
  useEffect(() => {
    onCategoryChange("all");
    setActive("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="flex justify-between flex-col xs:flex-row gap-2 px-4">
        <h1 className="font-bold text-2xl leading-8 ">{titleHeader}</h1>
        <div className="flex gap-2 items-center">
          <div
            className={`w-fit border-[1px] border-neutral p-2 rounded cursor-pointer hover:bg-customWhite hover:text-black ${
              display === "rows" ? "bg-customWhite text-black" : ""
            }`}
            onClick={() => displayList("rows")}
          >
            <ListBulletIcon className="w-[24px] h-[24px]" />
          </div>
          <div
            className={`w-fit border-[1px] border-neutral p-2 rounded cursor-pointer hover:bg-customWhite hover:text-black ${
              display === "grids" ? "bg-customWhite text-black" : ""
            }`}
            onClick={() => displayList("grids")}
          >
            <Squares2X2Icon className="w-[24px] h-[24px]" />
          </div>
          <div className="h-[18px] border-l-2 border-neutral  mx-[12px] "></div>
          <button
            onClick={() => handleShuffle()}
            className="flex items-center justify-center px-4 py-2  rounded border-neutral border-[1px] gap-2 cursor-pointer hover:bg-customWhite hover:text-black"
          >
            <span className="flex ">
              <ArrowsUpDownIcon className="w-[15px] h-[25px]" />
            </span>
            Shuffle
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-4 pt-8">
        {titleHeader === "Lists" && (
          <>
            <button
              onClick={() => handleButtonClick("all")}
              className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
                active == "all" ? "bg-[#FF0520] text-white" : "bg-customWhite text-customGrayBtn"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleButtonClick("liked")}
              className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
                active == "liked" ? "bg-[#FF0520] text-white" : "bg-customWhite text-customGrayBtn"
              }`}
            >
              <span className="flex">
                <HeartIcon className="w-4 mr-2" />
                Liked
              </span>
            </button>
            <div className="h-[18px] border-l-2 border-neutral  mx-[12px] "></div>
          </>
        )}
        {categories &&
          categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(`${category.category}`)}
              className={`px-4 py-2 capitalize  rounded-md font-normal text-base leading-6 font-inter  ${
                active == `${category.category}` ? "bg-[#FF0520] text-white" : "bg-customWhite text-customGrayBtn"
              }`}
            >
              {humanize(category.category)}
              <span className="px-2 py-1 bg-white text-black font-bold rounded ml-2 ">{category.projectsCount}</span>
            </button>
          ))}
      </div>
    </div>
  );
}

export default ProjectsPageHeader;
