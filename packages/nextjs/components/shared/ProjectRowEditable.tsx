/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IProjectList } from "../../types/list";
import OPInput from "../op/input/OPInput";
import { useTimeout } from "usehooks-ts";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  project: IProjectList;
  showOriginalAllocation?: boolean;
  resetCounter?: number;
  maximum?: number;
  handleChange: (id: string, allocation: number) => void;
  handleRemove: (id: string) => void;
}

const ProjectRowEditable: React.FC<Props> = ({
  project,
  showOriginalAllocation,
  resetCounter,
  maximum,
  handleChange,
  handleRemove,
}) => {
  const [originalValue] = useState(project.allocation);
  const [newAllocation, setNewAllocation] = useState(project.allocation);
  const [showOverMax, setShowOverMax] = useState(false);

  const handleAllocationChange = (value: number | string) => {
    if (maximum != undefined && Number(value) > maximum) {
      setShowOverMax(true);
    }
    setNewAllocation(Number(value));
    handleChange(project._id, Number(value));
  };

  useEffect(() => {
    setNewAllocation(project.allocation);
  }, [project, project.allocation]);

  useEffect(() => {
    setNewAllocation(originalValue);
  }, [resetCounter, originalValue]);

  return (
    <>
      <div className={`${!project.name && "items-center"} grid grid-flow-col gap-4`}>
        <div className={` ${project.name ? "w-[80px]" : "w-[60px]"}`}>
          <Image
            alt="project list"
            height={"80"}
            width={"80"}
            src={`${project.profileImageUrl ? project.profileImageUrl : "/assets/gradient-bg.png"} `}
            className="w-full rounded-xl"
          />
        </div>
        <div className="">
          <h3 className="font-bold text-lg">{project.name}</h3>
        </div>
      </div>
      <div className="flex flex-row">
        {showOriginalAllocation ? (
          <OPInput
            value={originalValue}
            handleChange={() => {
              return;
            }}
            customClassesGroup="mr-2 pointer-events-none"
            customClassesInput="pointer-events-none text-[#8496AE] bg-[#E2E8F0] border-neutral cursor-default"
            customClassesSpan="bg-[#E2E8F0] text-[#8496AE] border-neutral pointer-events-none"
          />
        ) : (
          ""
        )}
        {showOverMax ? <Message delay={3000} setShowOverMax={setShowOverMax} /> : ""}
        <label className={`input-group rounded`}>
          <input
            type="string"
            onChange={e => handleAllocationChange(parseInt(e.target.value) || 0)}
            className={`input input-info input-bordered border-slate-200 border w-[100px] rounded `}
            value={newAllocation}
          />
          <span className={`rounded bg-secondary border-r border-b border-t border-slate-200`}>OP</span>
        </label>
        <button
          onClick={() => handleRemove(project._id)}
          className={`ml-2 btn-md flex items-center rounded-xl p-3 border-[1px] border-slate-200`}
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default ProjectRowEditable;

interface MessageProps {
  delay: number;
  setShowOverMax: (show: boolean) => void;
}
const Message: React.FC<MessageProps> = ({ delay, setShowOverMax }) => {
  useTimeout(() => {
    setShowOverMax(false);
  }, delay);
  return (
    <>
      <p className="p-2 mx-2 my-0 rounded-2xl bg-warning text-warning-content whitespace-nowrap align-middle leading-8 flex flex-row items-center">
        <InformationCircleIcon className="w-6 h-6 mr-1" /> Exceeded Max
      </p>
    </>
  );
};
