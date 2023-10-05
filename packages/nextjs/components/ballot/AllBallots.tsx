import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchProjects from "../SearchProjects";
import { Spinner } from "../Spinner";
import useSWR from "swr";
import { useAccount } from "wagmi";
import * as solid from "@heroicons/react/20/solid";
import ListHeader from "~~/components/lists/ListHeader";
import YourBallot from "~~/components/op/projects/YourBallot";
import Sidebar from "~~/components/shared/Sidebar";
import { useBallot } from "~~/context/BallotContext";
import { fetcher } from "~~/utils/fetcher";

interface IBallotProject {
  id: string;
  name: string;
  category?: string;
  handle: string;
  allocation: number;
  isOpenModal: boolean;
}
const AllBallots = () => {
  const { isDisconnected } = useAccount();
  const { state, dispatch } = useBallot();
  const [wallet, setWallet] = useState<boolean | false>(false);

  const { isLoading } = useSWR(`/api/projects?pageQuery=1&limit=12`, fetcher);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ballotProjects, setBallotProjects] = useState<IBallotProject[]>([]);

  const [filteredBallotProjects, setFilteredBallotProjects] = useState<IBallotProject[] | undefined>([]);

  // const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    setBallotProjects([...state.projects.map((project: any) => ({ ...project, isOpenModal: false }))]);
  }, [state]);
  const handleOpenBallotModal = (id: string) => {
    setBallotProjects(prev => {
      return prev.map(project =>
        project.id === id ? { ...project, isOpenModal: !project.isOpenModal } : { ...project, isOpenModal: false },
      );
    });
  };
  const handleBallotRemoval = (id: string) => {
    handleOpenBallotModal(id);

    dispatch({
      type: "REMOVE_PROJECT",
      targetId: id,
    });
  };

  useEffect(() => {
    setWallet(isDisconnected);
  }, [isDisconnected]);

  useEffect(() => {
    function filterProjects() {
      const _filteredProjects =
        selectedCategory === "all"
          ? ballotProjects
          : ballotProjects?.filter(project => project.category === selectedCategory);
      setFilteredBallotProjects(_filteredProjects);
    }
    filterProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, ballotProjects]);

  if (isLoading) {
    return (
      <div className="flex mt-8 pt-8 justify-center">
        <Spinner />
      </div>
    );
  }

  const totalAllocatedOp = ballotProjects.reduce((sum, p) => sum + p?.allocation, 0);
  return (
    <div className="mx-auto px-12 mt-12 pb-12 grid grid-cols-1 lg:grid-cols-[350px,1fr]  gap-8">
      {!wallet ? <YourBallot /> : <Sidebar />}
      <div>
        <div className="container  mx-auto">
          <ListHeader
            titleHeader="My ballot"
            display="grids"
            onCategoryChange={setSelectedCategory}
            projects={ballotProjects}
            onShuffleProjects={setBallotProjects}
          />
        </div>
        {ballotProjects.length === 0 ? (
          <div className="text-center mt-12">
            <p>You have no projects in your ballot</p>
          </div>
        ) : (
          <div className="mt-10 border-OPgray border-2 rounded-3xl gap-10 grid  px-8 py-10">
            <div className="project__header-container md:min-w-[320px]">
              <div className="project__header-container--content">
                <h3 className="text-lg sm:text-2xl font-bold   items-center">
                  <span>{ballotProjects?.length} projects</span>{" "}
                  <span className="text-center rounded-full bg-black w-2 h-2"></span>{" "}
                  <span>{totalAllocatedOp} OP allocated</span>
                </h3>
                <div className="">
                  <SearchProjects />
                </div>
              </div>
            </div>
            {filteredBallotProjects && (
              <div
                className="max-h-[500px] pr-2 overflow-y-auto
  scrollbar-thin
  scrollbar-thumb-rounded-full
  scrollbar-thumb-OPlightgray"
              >
                {filteredBallotProjects.map((project: any, index: number) => (
                  <div
                    key={index}
                    className={`border-OPlightgray py-6 ${
                      index === ballotProjects.length - 1 ? "" : "border-b-2"
                    }  grid xs:grid-flow-col items-center justify-between `}
                  >
                    <div className={`${!project.handle && "items-center"} grid  grid-flow-col gap-4`}>
                      <div className={` ${project.handle ? "w-[80px]" : "w-[60px]"}`}>
                        <Image
                          alt="project list"
                          height={"80"}
                          width={"80"}
                          src="/assets/gradient-bg.png"
                          className="w-full rounded-xl"
                        />
                      </div>
                      <div className="">
                        <h3 className="font-bold text-lg truncate ">{project.name}</h3>
                        {project.handle && <p className="mt-0 text-[1.1rem] text-OPbluegray">{project.handle}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg ">{project.allocation} OP</p>
                      <div className="relative">
                        <button
                          onClick={() => {
                            handleOpenBallotModal(project.id);
                          }}
                          className={` ${
                            project.isOpenModal && "bg-gray-200"
                          }  flex items-center rounded-xl p-2 lg:p-3 border-[1px] border-[#CBD5E0]`}
                        >
                          <solid.EllipsisHorizontalIcon className="w-6 h-6 " />
                        </button>
                        {project.isOpenModal && (
                          <div className="absolute  bg-white rounded-xl top-16 z-50 -right-16 sm:right-0 w-[200px] py-3 px-8  border-[1px] border-[#e5e8ed]">
                            <button className="flex gap-4 items-center">
                              <solid.AdjustmentsVerticalIcon className="w-6 h-6 text-[#68778D]" />
                              <p>Edit</p>
                            </button>
                            <button
                              onClick={() => {
                                handleBallotRemoval(project.id);
                              }}
                              className="flex gap-4 items-center"
                            >
                              <solid.TrashIcon className="w-6 h-6 text-[#68778D]" />
                              <p>Remove</p>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="rounded-2xl bg-OPoffwhite px-5 grid grid-flow-col justify-between items-center">
              <p>Total</p>
              <p>{totalAllocatedOp} OP</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBallots;
