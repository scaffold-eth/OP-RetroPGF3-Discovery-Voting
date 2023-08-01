export interface ProjectLists {
  id: number;
  banner: string;
  logo: string;
  name: string;
  description: string;
  category: string;
  slug: string;
}

export const getAllProjects: () => ProjectLists[] = () => {
  return [
    {
      id: 1,
      banner: "/assets/projects/Img.png",
      logo: "/assets/Logo.png",
      name: "WalletConnect",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Collective Governance",
      slug: "collective-governance",
    },
    {
      id: 2,
      banner: "/assets/projects/Img (1).png",
      logo: "/assets/projects/Logo_2.png",
      name: "DefiLlama",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Developer Ecosystem",
      slug: "Defillama",
    },
    {
      id: 3,
      banner: "/assets/projects/Img (2).png",
      logo: "/assets/projects/Logo34.png",
      name: "Cryptotesters",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "End User Experience and Adoption",
      slug: "cryptotesters",
    },
    {
      id: 4,
      banner: "/assets/projects/Img (3).png",
      logo: "/assets/Logo.png",
      name: "Hardhat",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "End User Experience and Adoption",
      slug: "hardhat",
    },
    {
      id: 5,
      banner: "/assets/projects/Img (4).png",
      logo: "/assets/Logo.png",
      name: "Lattice",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Developer Ecosystem",
      slug: "lattice",
    },
    {
      id: 6,
      banner: "/assets/projects/Img (5).png",
      logo: "/assets/Logo.png",
      name: "polynya",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Collective Governance",
      slug: "polynya",
    },
    {
      id: 7,
      banner: "/assets/projects/Img.png",
      logo: "/assets/Logo.png",
      name: "Hardhat",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Developer Ecosystem",
      slug: "hardhat-2",
    },
    {
      id: 8,
      banner: "/assets/projects/Img.png",
      logo: "/assets/Logo.png",
      name: "Lattice",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Developer Ecosystem",
      slug: "lattice-2",
    },
    {
      id: 9,
      banner: "/assets/projects/Img.png",
      logo: "/assets/Logo.png",
      name: "polynya",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Developer Ecosystem",
      slug: "polynya-2",
    },
    {
      id: 10,
      banner: "/assets/projects/Img.png",
      logo: "/assets/Logo.png",
      name: "WalletConnect",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Developer Ecosystem",
      slug: "walletconnect2",
    },
    {
      id: 11,
      banner: "/assets/projects/Img.png",
      logo: "/assets/Logo.png",
      name: "WalletConnect",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "OP Stack",
      slug: "walletconnect3",
    },
    {
      id: 12,
      banner: "/assets/projects/Img.png",
      logo: "/assets/Logo.png",
      name: "WalletConnect",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ...",
      category: "Developer Ecosystem",
      slug: "walletconnect3",
    },
  ];
};
