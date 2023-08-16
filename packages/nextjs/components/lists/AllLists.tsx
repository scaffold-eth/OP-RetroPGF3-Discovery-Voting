import React, { useState } from "react";
import Link from "next/link";
import Card from "~~/components/lists/Card";
import ListHeader from "~~/components/lists/ListHeader";
import Pagination from "~~/components/lists/Pagination";
import { ListDocument } from "~~/models/List";

interface Props {
  lists: ListDocument[];
}

const AllLists: React.FC<Props> = ({ lists }) => {
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

  const handleLike = (id: number) => {
    console.log("Liked:", id);
    // setProjects(prevProjects => {
    //   return prevProjects.map(project => {
    //     if (project.id === id) {
    //       return { ...project, liked: !project.liked, likes: project.liked ? project.likes - 1 : project.likes + 1 };
    //     }
    //     return project;
    //   });
    // });
  };

  const onCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProjects =
    selectedCategory === "all" ? lists : lists.filter(list => list.tags.includes(selectedCategory));

  return (
    <div className="">
      <ListHeader displayList={displayList} titleHeader="Lists" display={display} onCategoryChange={onCategoryChange} />
      <div
        className={`px-4 grid pt-8 gap-4 ${
          display === "grids" ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" : "grid-rows-1 w-full"
        } `}
      >
        {filteredProjects.map(list => (
          <Link key={list._id} href={`lists/${list._id}`}>
            <Card key={list._id} list={list} onLike={handleLike} />
          </Link>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default AllLists;
