import React from "react";
import type { NextPage } from "next";
import AllLists from "~~/components/lists/AllLists";

const ListsPage: NextPage = () => {
  return (
    <div className="bg-base-100">
      <AllLists />
    </div>
  );
};

export default ListsPage;
