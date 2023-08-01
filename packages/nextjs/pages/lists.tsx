import React, { useState } from "react";
import Card from "~~/components/lists/Card";
import ListHeader from "~~/components/lists/ListHeader";
import Pagination from "~~/components/lists/Pagination";

const data = [
  {
    id: 1,
    name: "List 1",
    user_avatar: "/assets/Img.png",
    username: "verycoolperson",
    likes: 12,
    liked: false,
    projects_icon: 21,
    projects: 21,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Collective Governance", "Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 2,
    name: "List 2",
    user_avatar: "/assets/Img.png",
    username: "anothercoolperson",
    likes: 8,
    liked: false,
    projects_icon: 15,
    projects: 15,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 3,
    name: "List 3",
    user_avatar: "/assets/Img.png",
    username: "user3",
    likes: 20,
    liked: false,
    projects_icon: 5,
    projects: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 4,
    name: "List 4",
    user_avatar: "/assets/Img.png",
    username: "user4",
    likes: 5,
    liked: false,
    projects_icon: 8,
    projects: 8,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 5,
    name: "List 5",
    user_avatar: "/assets/Img.png",
    username: "user5",
    likes: 18,
    liked: false,
    projects_icon: 12,
    projects: 12,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 6,
    name: "List 6",
    user_avatar: "/assets/Img.png",
    username: "user6",
    likes: 30,
    liked: false,
    projects_icon: 7,
    projects: 7,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 7,
    name: "List 7",
    user_avatar: "/assets/Img.png",
    username: "user7",
    likes: 25,
    liked: false,
    projects_icon: 10,
    projects: 10,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 8,
    name: "List 8",
    user_avatar: "/assets/Img.png",
    username: "user8",
    likes: 14,
    liked: false,
    projects_icon: 3,
    projects: 3,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Developer Ecosystem", "End User Experience and Adoption", "OP Stack"],
  },
  {
    id: 9,
    name: "List 9",
    user_avatar: "/assets/Img.png",
    username: "user9",
    likes: 7,
    liked: false,
    projects_icon: 6,
    projects: 6,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Collective Governance", "Developer Ecosystem", "End User Experience and Adoption"],
  },
  {
    id: 10,
    name: "List 10",
    user_avatar: "/assets/Img.png",
    username: "user10",
    likes: 17,
    liked: false,
    projects_icon: 19,
    projects: 19,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
    tags: ["Category name", "category4", "category5"],
  },
];

const Lists = () => {
  const [display, setDisplay] = useState("grids");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const totalPages = 5;
  const [projects, setProjects] = useState(data);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const displayList = (option: string) => {
    setDisplay(option);
  };

  const handleLike = (id: number) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === id) {
          return { ...project, liked: !project.liked, likes: project.liked ? project.likes - 1 : project.likes + 1 };
        }
        return project;
      });
    });
  };

  const onCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter(project => project.tags.includes(selectedCategory));

  return (
    <div className="">
      <ListHeader displayList={displayList} titleHeader="Lists" display={display} onCategoryChange={onCategoryChange} />
      <div
        className={`px-4 grid pt-8 gap-4 ${
          display === "grids" ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" : "grid-rows-1 w-full"
        } `}
      >
        {filteredProjects.map(project => (
          <Card key={project.id} project={project} onLike={handleLike} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Lists;
