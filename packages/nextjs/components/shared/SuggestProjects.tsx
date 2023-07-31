import React, { useEffect, useState } from "react";
import Card from "../projects/Card";

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
];

interface Project {
  id: number;
  banner: string;
  logo: string;
  name: string;
  description: string;
  category: string;
}

function SuggestProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getSuggestProjects = async () => {
      try {
        // Fetch SuggestProjects from data source
        // const data: Project[] = await fetchProjectData();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching suggest projects:", error);
      }
    };
    getSuggestProjects();
  }, []);

  return (
    <div className="pt-16 pb-24">
      <h3 className="font-bold text-2xl leading-8 ">You may be also interested</h3>
      <p className="text-lightGray text-[17px] leading-5">Discover more popular projects</p>
      <div className="grid pt-4 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {projects.map(project => (
          <Card key={project.id} project={project} display="grids" />
        ))}
      </div>
    </div>
  );
}

export default SuggestProjects;
