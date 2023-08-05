import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import AllLists from "~~/components/lists/AllLists";
import dbConnect from "~~/lib/dbConnect";
import List, { ListDocument } from "~~/models/List";

interface ListProps {
  lists: ListDocument[];
}

const ListsPage: NextPage<ListProps> = ({ lists }) => {
  return (
    <div>
      <AllLists lists={lists} />
    </div>
  );
};

export default ListsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    await dbConnect();
    console.log("context", context.query);
    const lists: ListDocument[] = await List.find({}).limit(10);
    return { props: { lists: JSON.parse(JSON.stringify(lists)) } };
  } catch (e) {
    console.log(e);
    return { props: { lists: [] } }; // returns an empty array if there's an error
  }
};