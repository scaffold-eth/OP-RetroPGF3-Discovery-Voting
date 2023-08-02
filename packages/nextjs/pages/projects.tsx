import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ListHeader from "~~/components/lists/ListHeader";
import Pagination from "~~/components/lists/Pagination";
import YourBallot from "~~/components/op/projects/YourBallot";
import Card from "~~/components/projects/Card";
import Sidebar from "~~/components/shared/Sidebar";

const data = [
  {
    id: 1,
    banner: "/assets/projects/Img.png",
    logo: "/assets/Logo.png",
    name: "WalletConnect",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Collective Governance",
  },
  {
    id: 2,
    banner: "/assets/projects/Img (1).png",
    logo: "/assets/projects/Logo_2.png",
    name: "DefiLlama",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
  {
    id: 3,
    banner: "/assets/projects/Img (2).png",
    logo: "/assets/projects/Logo34.png",
    name: "Cryptotesters",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "End User Experience and Adoption",
  },
  {
    id: 4,
    banner: "/assets/projects/Img (3).png",
    logo: "/assets/Logo.png",
    name: "Hardhat",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "End User Experience and Adoption",
  },
  {
    id: 5,
    banner: "/assets/projects/Img (4).png",
    logo: "/assets/Logo.png",
    name: "Lattice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
  {
    id: 6,
    banner: "/assets/projects/Img (5).png",
    logo: "/assets/Logo.png",
    name: "polynya",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Collective Governance",
  },
  {
    id: 7,
    banner: "/assets/projects/Img.png",
    logo: "/assets/Logo.png",
    name: "Hardhat",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
  {
    id: 8,
    banner: "/assets/projects/Img.png",
    logo: "/assets/Logo.png",
    name: "Lattice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
  {
    id: 9,
    banner: "/assets/projects/Img.png",
    logo: "/assets/Logo.png",
    name: "polynya",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
  {
    id: 10,
    banner: "/assets/projects/Img.png",
    logo: "/assets/Logo.png",
    name: "WalletConnect",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
  {
    id: 11,
    banner: "/assets/projects/Img.png",
    logo: "/assets/Logo.png",
    name: "WalletConnect",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
  {
    id: 12,
    banner: "/assets/projects/Img.png",
    logo: "/assets/Logo.png",
    name: "WalletConnect",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
    category: "Developer Ecosystem",
  },
];

const Projects = () => {
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
        <ListHeader displayList={displayList} titleHeader="Projects" display={display} />
        <div
          className={`px-4 grid pt-8 gap-4 ${
            display === "grids" ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" : "grid-rows-1 w-full"
          } `}
        >
          {data.map(project => (
            <Card key={project.id} project={project} display={display} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Projects;
