import React from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

function Sidebar() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom right, #FBDD5D 30%, #81D9FF 90%, #FCA5F3 10%)",
      }}
      className="  h-[556px]  min-w-[336px] w-[336px] rounded-[999px] md:mx-auto lg:order-first md:order-last"
    >
      <Image
        width={120}
        height={120}
        src="/assets/sidebar/Sunny.png"
        alt="Sunny"
        className="mt-8 mx-auto w-[120px] h-[120px]"
      />
      <div className="w-[80%] mx-auto mt-8">
        <h3 className="font-bold leading-7">30 million OP for public goods</h3>
        <p className="text-base font-normal text-lightBlack leading-6">
          RetroPGF voting is live! View nominated projects that are eligible to receive retroactive public goods
          funding.
        </p>

        <div className="flex items-center cursor-pointer">
          <p className="font-semibold mt-4 mr-4">Voting guideline</p>
          <ArrowUpRightIcon className="w-[20px] h-[20px]" />
        </div>
        <Image
          width={120}
          height={120}
          src="/assets/sidebar/Sparkles.png"
          alt="Sparkles"
          className="mx-auto w-[55px] h-[55px]"
        />
      </div>
    </div>
  );
}

export default Sidebar;
