import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import AllLists from "~~/components/lists/AllLists";
import dbConnect from "~~/lib/dbConnect";
import List, { ListDocument } from "~~/models/List";

interface ListProps {
  lists: ListDocument[];
}

const ListsPage: NextPage<ListProps> = ({ lists }) => {
  if (lists.length < 1)
    return (
      <div className="text-center font-bold text-2xl pt-8">
        <h1>No list available...</h1>
      </div>
    );
  return (
    <div>
      <AllLists lists={lists} />
    </div>
  );
};

export default ListsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await dbConnect();
    const lists: ListDocument[] = await List.find({}).limit(10);
    return { props: { lists: JSON.parse(JSON.stringify(lists)) } };
  } catch (e) {
    console.log(e);
    return { props: { lists: [] } }; // returns an empty array if there's an error
  }
};