import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Card from "~~/components/lists/Card";
import ListHeader from "~~/components/lists/ListHeader";
import Pagination from "~~/components/lists/Pagination";
import YourBallot from "~~/components/op/projects/YourBallot";
import Sidebar from "~~/components/shared/Sidebar";

const data = [
  {
    id: 1,
    name: "List 1",
    user_avatar: "/assets/Img.png",
    username: "verycoolperson",
    likes: 12,
    projects_icon: 21,
    projects: 21,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category1", "category2"],
  },
  {
    id: 2,
    name: "List 2",
    user_avatar: "/assets/Img.png",
    username: "anothercoolperson",
    likes: 8,
    projects_icon: 15,
    projects: 15,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category1", "category2"],
  },
  {
    id: 3,
    name: "List 3",
    user_avatar: "/assets/Img.png",
    username: "user3",
    likes: 20,
    projects_icon: 5,
    projects: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category3", "category4"],
  },
  {
    id: 4,
    name: "List 4",
    user_avatar: "/assets/Img.png",
    username: "user4",
    likes: 5,
    projects_icon: 8,
    projects: 8,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category5", "category6"],
  },
  {
    id: 5,
    name: "List 5",
    user_avatar: "/assets/Img.png",
    username: "user5",
    likes: 18,
    projects_icon: 12,
    projects: 12,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category1", "category3"],
  },
  {
    id: 6,
    name: "List 6",
    user_avatar: "/assets/Img.png",
    username: "user6",
    likes: 30,
    projects_icon: 7,
    projects: 7,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category2", "category5"],
  },
  {
    id: 7,
    name: "List 7",
    user_avatar: "/assets/Img.png",
    username: "user7",
    likes: 25,
    projects_icon: 10,
    projects: 10,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category4", "category6"],
  },
  {
    id: 8,
    name: "List 8",
    user_avatar: "/assets/Img.png",
    username: "user8",
    likes: 14,
    projects_icon: 3,
    projects: 3,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category2", "category3"],
  },
  {
    id: 9,
    name: "List 9",
    user_avatar: "/assets/Img.png",
    username: "user9",
    likes: 7,
    projects_icon: 6,
    projects: 6,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category1", "category6"],
  },
  {
    id: 10,
    name: "List 10",
    user_avatar: "/assets/Img.png",
    username: "user10",
    likes: 17,
    projects_icon: 19,
    projects: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category4", "category5"],
  },
];

const Lists = () => {
  const { isDisconnected } = useAccount();
  const [wallet, setWallet] = useState<boolean | false>(false);
  const [display, setDisplay] = useState("grids");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const displayList = (option: string) => {
    setDisplay(option);
  };

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  return (
    <div className="mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-4">
      {!wallet ? <YourBallot /> : <Sidebar />}
      <div className="">
        <ListHeader displayList={displayList} titleHeader="Lists" display={display} />
        <div
          className={`px-4 grid pt-8 gap-4 ${
            display === "grids" ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" : "grid-rows-1 w-full"
          } `}
        >
          {data.map(project => (
            <Card key={project.id} project={project} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Lists;
