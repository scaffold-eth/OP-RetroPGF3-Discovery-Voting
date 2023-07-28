import React from "react";
import Image from "next/image";
import CustomProjectButton from "../btn/CustomProjectButton";
import BaseModal from "./BaseModal";
import { SquaresPlusIcon } from "@heroicons/react/20/solid";

interface IVoteModal {
  onClose: () => void;
}
const VoteModal: React.FC<IVoteModal> = ({ onClose }) => {
  return (
    <BaseModal onClose={onClose}>
      <div className=" max-w-[400px] bg-white rounded-xl p-6">
        <div className="grid gap-6  grid-flow-col items-center justify-between">
          <h3 className="text-lg font-bold ">vote</h3>
          <button onClick={onClose} className="text-lg text-[#a2aab6]  btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        <p className="text-[#a2aab6] text-sm">
          All the data will be saved locally on this browser untill you finalize your vote.
        </p>

        <div className="rounded-xl p-1 bg-[#f0f2f5] mb-3 items-center grid justify-start grid-flow-col gap-4">
          <div className="w-[50px]">
            <Image
              alt="project list  "
              height={"80"}
              width={"80"}
              src="/assets/gradient-bg.png"
              className="w-full rounded-xl"
            />
          </div>
          <div className="">
            <h3 className="font-bold text-lg">Polynya</h3>
          </div>
        </div>
        <div className="mb-5 border-[#f0f2f5]  border-2 rounded-xl px-4 py-0 grid grid-flow-col justify-between items-center">
          <p className="m-0 py-2">35,416</p>
          <p className="font-bold h-full m-0 border-[#f0f2f5] border-l-2 py-2 pl-4">OP</p>
        </div>

        <div className="w-full">
          <CustomProjectButton
            text="Add to ballot"
            customClassName=" bg-[#ff0000] py-4 rounded-lg border-[#ff0000] w-full  text-[#ffffff]"
          >
            <SquaresPlusIcon className="w-5 h-5" />
          </CustomProjectButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default VoteModal;
