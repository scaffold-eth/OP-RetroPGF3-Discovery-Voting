import React, { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import Pagination from "./Pagination";
import useSWR from "swr";
import { useSignMessage } from "wagmi";
import { useAccount } from "wagmi";
import Card from "~~/components/lists/Card";
import ListHeader from "~~/components/lists/ListHeader";
import YourBallot from "~~/components/op/projects/YourBallot";
import Sidebar from "~~/components/shared/Sidebar";
import { ListDocument } from "~~/models/List";
import VerifyOptions from "~~/types/verifyOptions";
import { fetcher } from "~~/utils/fetcher";
import { sendLikeRequest } from "~~/utils/like";
import { notification } from "~~/utils/scaffold-eth";
import { getSignMessageForId } from "~~/utils/sign";

const AllLists: React.FC = () => {
  const [display, setDisplay] = useState("grids");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingListId, setLoadingListId] = useState<string>("");
  const {
    data: listsData,
    isLoading: isLoadingList,
    mutate,
  } = useSWR(`/api/list?pageQuery=${currentPage}&limit=12`, fetcher);
  const [totalPages, setTotalPages] = useState(1);
  const [lists, setLists] = useState<ListDocument[] | undefined>([]);
  const { isDisconnected } = useAccount();
  const [wallet, setWallet] = useState<boolean | false>(false);

  const { signMessageAsync } = useSignMessage({
    onSettled(data, error) {
      error && notification.error(`${error}`);
      console.log("Settled", { data, error });
    },
  });

  const { address } = useAccount();

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const displayList = (option: string) => {
    setDisplay(option);
  };

  const signMessage = async (options: VerifyOptions) => {
    const messageToSign = await getSignMessageForId(options.messageId, options);
    return await signMessageAsync({ message: messageToSign });
  };

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  useEffect(() => {
    if (!listsData) return;
    setTotalPages(listsData.totalPages);
    setLists(listsData.lists);
  }, [listsData]);

  const handleLike = async (list: any) => {
    try {
      setIsLoading(true);
      setLoadingListId(list._id);
      const options: VerifyOptions = { address, messageId: "listLike", list };
      const signature = await signMessage(options);

      const responseData = await sendLikeRequest(address, signature, list._id);
      if (responseData && responseData.message) {
        notification.success(responseData.message);
      }

      mutate();
    } catch (e: any) {
      console.log("ERR_LIKING_LIST:", e);
      notification.error(e.message);
    } finally {
      setTimeout(() => setIsLoading(false), 4000);
    }
  };

  const onCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProjects =
    selectedCategory === "all" ? lists : lists?.filter(list => list?.tags?.includes(selectedCategory));

  if (lists && lists.length === 0 && isLoadingList) {
    return (
      <div className="flex mt-8 pt-8 justify-center">
        <Spinner />
      </div>
    );
  }

  if (lists && lists.length === 0)
    return (
      <div className="text-center font-bold text-2xl pt-8">
        <h1>No list available...</h1>
      </div>
    );

  return (
    <div className="mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-4">
      {!wallet ? <YourBallot /> : <Sidebar />}
      {isLoadingList ? (
        <div className="flex mt-8 pt-8 justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full pb-10 mb-5">
          <ListHeader
            displayList={displayList}
            titleHeader="Lists"
            display={display}
            onCategoryChange={onCategoryChange}
          />
          <div
            className={`px-4 w-full grid pt-8 gap-4 ${
              display === "grids" ? "list__container-card_display  " : "grid-rows-1 w-full"
            } `}
          >
            {filteredProjects?.map(list => (
              <div key={list._id} className={`${display === "grids" && "max-w-[400px] w-full"}`}>
                <Card list={list} isLoading={isLoading} loadingList={loadingListId} onLike={() => handleLike(list)} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default AllLists;
