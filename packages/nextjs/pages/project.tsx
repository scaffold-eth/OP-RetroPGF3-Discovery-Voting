import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  ArrowUturnRightIcon,
  DocumentIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
  HeartIcon as HeartFilledIcon,
} from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import ProjectList from "~~/components/op/projects/ProjectList";
import { Address } from "~~/components/scaffold-eth";
import CustomProjectButton from "~~/components/op/btn/CustomProjectButton";
import { AdjustmentsHorizontalIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";


const Project_header = () => {
  const [likedModal, setLikedModal] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  return (
<div className="relative">
  <img className="w-100 m-10 rounded-lg shadow-md" src="/assets/OFF2.png" alt="Header Pic" />

  <div className="absolute bottom-0 left-5 ml-10 flex">
    <img className="w-20 h-20 rounded-lg shadow-md mt-5" src="/assets/PF.png" alt="Profile Pic" />
  </div>

  <div className="absolute bottom-0 left-5 ml-10 mt-20 pt-10 flex flex-col">
    <h1 className="font-bold pt-20 pl-20">
      Orbiter Finance
    </h1>

    <div className="flex items-center space-x-4 mt-1 pl-20">

      <a href="projects" className="font-thin-underline">
        @orbiter_finance
      </a>

      <a href="https://twitter.com/orbiter">
        <img src="/assets/twitter-logo.png" alt="Twitter" className="h-2 w-2" />
      </a>

      <a href="https://github.com/orbiter">
        <img src="/assets/github-logo.png" alt="GitHub" className="h-2 w-2" />
      </a>

      <a href="https://orbiter.com">
        <img src="/assets/website-logo.png" alt="Website" className="h-2 w-2" />
      </a>

      <CustomProjectButton
        text="Add to ballot"
        customClassName=" bg-[#ff0000] rounded-lg border-[#ff0000]  text-[#ffffff]"
      >
        <SquaresPlusIcon className="w-5 h-5" />
      </CustomProjectButton>

    </div>
  </div>
</div>







    

  );
};

export default Project_header;
