import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import CreatableSelect from "react-select/creatable";
import { useAccount } from "wagmi";
import { useBallot } from "~~/context/BallotContext";
import { notification } from "~~/utils/scaffold-eth";
import { tagsData } from "~~/utils/tags";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateList: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [impactEvaluation, setImpactEvaluation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { address } = useAccount();
  const { state } = useBallot();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null; // Return null instead of false
  }

  const shareAsList = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Code to package the ballot as a list
    const listData = {
      name: listName,
      creator: address,
      description,
      impactEvaluation,
      tags,
      projects: state.projects.map(project => ({
        project: project._id,
        allocation: project.allocation,
      })),
    };
    // Save the list to the database
    try {
      const response = await fetch("/api/list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(listData),
      });
      if (response.ok) {
        // Handle confirmation and navigation
        setIsLoading(false);
        notification.success("List created successfully") && router.push(`/lists/`);
      } else {
        // Handle any errors
        setIsLoading(false);
        notification.error("Error creating list.");
      }
    } catch (e) {
      console.log("ERR_SHARING_LIST::", e);
      setIsLoading(false);
    }
  };

  function handleSelectChange(data: any) {
    const value: any = [];
    data.length &&
      data.map((item: any) => {
        value.push(item.value);
        setTags(value);
      });
  }

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex ">
        <div
          className="overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-rounded-full
      scrollbar-thumb-[#d4d8de] modal-box relative p-8 bg-base-100 w-full max-w-md m-auto flex-col flex"
        >
          <span className="absolute top-0 right-0  m-4 cursor-pointer" onClick={onClose}>
            <IoMdClose size={28} />
          </span>
          <h3 className="text-center mt-5 font-bold text-4xl leading-8">Share your vote</h3>
          <p className="text-center font-semibold text-lg  mt-4 mb-5">Create a list of the projects in your ballot</p>
          <form onSubmit={shareAsList} className="flex flex-col">
            <input
              className="input placeholder:text-lg input-info input-bordered border-slate-200 border w-full"
              type="text"
              value={listName}
              maxLength={75}
              onChange={e => setListName(e.target.value)}
              placeholder="List name"
            />

            <textarea
              className="textarea placeholder:text-lg textarea-bordered textarea-sm w-full mt-3 border-slate-200"
              value={description}
              maxLength={1000}
              onChange={e => setDescription(e.target.value)}
              placeholder="List description"
            />
            <textarea
              className="textarea placeholder:text-lg textarea-bordered textarea-sm w-full mt-3 border-slate-200"
              value={impactEvaluation}
              maxLength={1000}
              onChange={e => setImpactEvaluation(e.target.value)}
              placeholder="Describe the impact evolution"
            />
            <div className="form-control w-full mt-3">
              <label className="label p-0">
                <span className="label-text text-lg mb-2 font-semibold">Tag list</span>
              </label>
              <CreatableSelect
                className="bg-secondary text-black"
                onChange={handleSelectChange}
                closeMenuOnSelect={false}
                isMulti
                options={tagsData}
              />
            </div>
            <div className="flex gap-4 justify-end   mt-6">
              <button
                onClick={onClose}
                className={`btn bg-OPred hover:bg-red-600 text-white border-none px-10 rounded-lg capitalize `}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn bg-black border-none px-10 rounded-lg text-white capitalize  ${
                  isLoading ? "loading " : ""
                }`}
              >
                Share List
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateList;
