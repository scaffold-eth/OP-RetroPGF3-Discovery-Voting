import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import AllLists from "~~/components/lists/AllLists";
import YourBallot from "~~/components/op/projects/YourBallot";
import Sidebar from "~~/components/shared/Sidebar";

const ListsPage: NextPage = () => {
  const { isDisconnected } = useAccount();
  const [wallet, setWallet] = useState<boolean | false>(false);

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);
  return (
    <div className="mx-auto w-full px-12 mt-12 flex flex-col md:flex-row gap-4">
      {!wallet ? <YourBallot /> : <Sidebar />}

      <div className="w-full ">
        <AllLists />
      </div>
    </div>
  );
};

export default ListsPage;
