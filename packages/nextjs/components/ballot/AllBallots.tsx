import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../Spinner";
import CreateList from "../lists/CreateList";
import CustomProjectButton from "../op/btn/CustomProjectButton";
import LoadingModal from "../op/modals/LoadingModal";
import SuccessModal from "../op/modals/SuccessModal";
import ProjectRowEditable from "../shared/ProjectRowEditable";
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
  handle?: string;
  allocation: number;
  isOpenModal: boolean;
}
const AllBallots = () => {
  const { isDisconnected } = useAccount();
  const { state, dispatch } = useBallot();
  const router = useRouter();
  const [wallet, setWallet] = useState<boolean | false>(false);

  const { isLoading: isFetching } = useSWR(`/api/projects?pageQuery=1&limit=12`, fetcher);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ballotProjects, setBallotProjects] = useState<IBallotProject[]>([]);

  const [filteredBallotProjects, setFilteredBallotProjects] = useState<IBallotProject[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isAllocationError, setIsAllocationError] = useState(false);
  const [search, setSearch] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const handleSubmit = () => {
    // Validate ballot
    // sign ballot
    // send signed data to api
    console.log("submitting votes");
    setLoadingMessage("Submitting your ballot");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCreated(true);
    }, 3000);
  };
  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
    setFilteredBallotProjects(
      ballotProjects.filter(project => project.name.toLowerCase().includes(e.target.value.toLowerCase())),
    );
  };
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

  if (isFetching) {
    return (
      <div className="flex mt-8 pt-8 justify-center">
        <Spinner />
      </div>
    );
  }

  //edit
  const handleAllocationChange = (projectId: string, newAllocation: any) => {
    setIsAllocationError(false);
    let currentTotalAllocation = state.projects.reduce((sum, p) => sum + p.allocation, 0);
    // Ensure value is a number
    newAllocation = !Number.isNaN(newAllocation) && newAllocation > 0 ? newAllocation : 0;

    // Deduct the current project's allocation, since we're editing it
    const currentProjectAllocation = state.projects.find(p => p.id === projectId)?.allocation || 0;
    currentTotalAllocation -= currentProjectAllocation;

    const projectedTotal = newAllocation + currentTotalAllocation;

    if (projectedTotal > state.totalTokens) {
      newAllocation = state.totalTokens - currentTotalAllocation;
    }
    dispatch({ type: "UPDATE_ALLOCATION", projectId, newAllocation });
  };

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
                <div className="relative w-full">
                  <solid.MagnifyingGlassIcon className="pointer-events-none absolute mr-2 w-8 h-6 top-2 pl-2 text-slate-400" />
                  <input
                    className="input input-info input-bordered bg-secondary w-full min-w-full pl-10 rounded-md h-10"
                    name=" search"
                    value={search}
                    placeholder="Search for your ballot projects...."
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            {filteredBallotProjects && (
              <div className="pr-2">
                {filteredBallotProjects.map((project: any, index: number) => (
                  <div
                    key={index}
                    className={`border-OPlightgray py-2 ${
                      index === ballotProjects.length - 1 ? "" : "border-b-2"
                    }  grid xs:grid-flow-col items-center justify-between `}
                  >
                    <ProjectRowEditable
                      project={project}
                      handleChange={handleAllocationChange}
                      handleRemove={handleBallotRemoval}
                    />
                  </div>
                ))}
              </div>
            )}
            {isAllocationError ? (
              <div className="mt-4 rounded-2xl bg-warning text-warning-content px-5 grid grid-flow-col justify-between items-center">
                <p>Exceeded your total OP tokens</p>
                <p>
                  {totalAllocatedOp}/{state.totalTokens} OP
                </p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-secondary px-5 grid grid-flow-col justify-between items-center">
                <p>Total</p>
                <p>
                  {totalAllocatedOp}/{state.totalTokens} OP
                </p>
              </div>
            )}
            <div className="flex justify-end items-center  gap-4">
              <div>
                <CustomProjectButton
                  disabled={!state.projects.length ? true : false}
                  onClick={() => handleSubmit()}
                  text="Submit ballot"
                  customClassName="w-full bg-[#000000] py-2 rounded-lg border-[#000000]  text-[#ffffff]"
                >
                  <solid.SquaresPlusIcon className="w-5 h-5" />
                </CustomProjectButton>
              </div>
              <div>
                <CustomProjectButton
                  disabled={!state.projects.length ? true : false}
                  onClick={() => setIsShareOpen(true)}
                  text="Share as list"
                  customClassName=" w-full bg-[#008080] py-2 rounded-lg border-[#008080]  text-[#ffffff]"
                >
                  <solid.ShareIcon className="w-5 h-5" />
                </CustomProjectButton>
              </div>
            </div>
            <CreateList
              onClose={() => {
                setIsShareOpen(false);
              }}
              isOpen={isShareOpen}
            />

            {isCreated && (
              <SuccessModal
                message={"Ballot submitted successfully"}
                onClose={() => {
                  setIsCreated(false);
                  router.push("/projects");
                }}
              />
            )}
          </div>
        )}
        {isLoading && <LoadingModal message={loadingMessage} />}
      </div>
    </div>
  );
};

export default AllBallots;
