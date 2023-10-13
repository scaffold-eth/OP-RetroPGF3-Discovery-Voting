import React, { useEffect, useState } from "react";
import { ArrowsUpDownIcon, HeartIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { shuffle } from "~~/utils/shuffle";

type CategoryInfo = {
  category: string;
  projectsCount: number;
};

function ListsPageHeader({ displayList, titleHeader, display, onCategoryChange, onShuffleLists, lists }: any) {
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  const handleButtonClick = (options: string) => {
    setActive(options);
    onCategoryChange(options);
  };

  const handleShuffle = () => {
    if (lists) {
      const _shuffledProjects = shuffle([...lists]);
      onShuffleLists(_shuffledProjects);
    }
  };

  useEffect(() => {
    try {
      function getCategories(lists: any): CategoryInfo[] {
        if (!lists) return [];
        const recordedTags = new Set<string>();
        const tagCount: Record<string, number> = {};

        lists.forEach((project: any) => {
          project.tags.map((tag: string) => {
            if (recordedTags.has(tag)) {
              tagCount[tag]++;
            } else {
              recordedTags.add(tag);
              tagCount[tag] = 1;
            }
          });
        });

        return Array.from(recordedTags).map(category => ({
          category: category,
          projectsCount: tagCount[category],
        }));
      }
      setCategories(getCategories(lists));
    } catch (e) {
      console.log("ERR_SETTING_CATEGORIES", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-between flex-col xs:flex-row gap-2 px-4">
        <h1 className="font-bold text-2xl leading-8 ">{titleHeader}</h1>
        <div className="flex gap-2 items-center">
          <div
            className={`w-fit border-[1px] border-neutral p-2 rounded cursor-pointer hover:bg-customWhite hover:text-black ${
              display === "colums" ? "bg-customWhite text-black" : ""
            }`}
            onClick={() => displayList("colums")}
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
            {categories.length > 0 && <div className="h-[18px] border-l-2 border-neutral  mx-[12px] "></div>}
          </>
        )}
        {categories &&
          categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(`${category.category}`)}
              className={`px-4 py-2 rounded-md font-normal text-base leading-6 font-inter  ${
                active == `${category.category}` ? "bg-[#FF0520] text-white" : "bg-customWhite text-customGrayBtn"
              }`}
            >
              {category.category}
              <span className="px-2 py-1 bg-white text-black font-bold rounded ml-2 ">{category.projectsCount}</span>
            </button>
          ))}
      </div>
    </div>
  );
}

export default ListsPageHeader;
