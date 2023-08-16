import React, { useEffect } from "react";
import Image from "next/image";
import { ArrowUturnRightIcon, ChevronDownIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import CustomProjectButton from "~~/components/op/btn/CustomProjectButton";
import { runFireWorks } from "~~/utils/op/fireworks";

const roughProjectData = [
  {
    name: "DefiLlama",

    image: "/assets/gradient-bg.png",
    op: "20, 416",
  },
  {
    name: "L2BEAT",

    image: "/assets/gradient-bg.png",
    op: "15, 416 ",
  },
  {
    name: "Polynya",

    image: "/assets/gradient-bg.png",
    op: "12, 416",
  },
];
interface IRoughProjectData {
  name: string;
  image: string;
  op: string;
}
const VoteSuccess = () => {
  useEffect(() => {
    runFireWorks();
  }, []);
  return (
    <div className=" mt-8 px-12 mx-auto max-w-[1200px] w-full">
      <div className="rounded-xl bg-white p-4 sm:p-8 shadow-sm md:flex items-center gap-4 lg:gap-10">
        <div className="flex-1 mb-6">
          <h3 className="text-4xl font-bold">Your vote has been submitted! 🥳</h3>
          <p className="text-[#68778D] mt-2">
            Thanks to you, 104,166 OP will be distributed to 5 projects, rewarding impactful contributions to the OP
            Stack.{" "}
          </p>
          <button
            className={`border-2 mt-10 p-3 border-[68778D] grid grid-flow-col items-center   justify-center rounded-xl `}
          >
            <ArrowUturnRightIcon className="h-6 w-6 text-gray-500 mr-1" />
            Share image
            <ChevronDownIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 p-5 bg-white rounded-xl ">
          <div className="bg-[#F1F4F9] mb-4 p-2 mx-auto rounded-full max-w-[300px] flex gap-2">
            <button className="bg-white px-4 rounded-full p-2 flex-1">Top projects </button>
            <button className=" px-4 rounded-full p-2 flex-1">Categoties </button>
          </div>
          <div className=" flex items-center text-center flex-col">
            <div className=" w-[50px]">
              <Image
                alt="project list"
                height={"80"}
                width={"80"}
                src="/assets/gradient-bg.png"
                className="w-full rounded-full"
              />
            </div>
            <p className="text-[#68778D]">Optimism RetroPGF Round 2</p>
            <h3 className="font-bold text-3xl ">104,166 OP allocated by Kain.eth</h3>

            <div className="w-full">
              {roughProjectData.map((project: IRoughProjectData, index: number) => (
                <div key={index} className={`border-[#ccd2db]   grid grid-flow-col items-center justify-between mb-2 `}>
                  <div className=" grid  grid-flow-col items-center gap-4">
                    <div className=" w-[40px]">
                      <Image
                        alt="project list  "
                        height={"80"}
                        width={"80"}
                        src="/assets/gradient-bg.png"
                        className="w-full rounded-xl"
                      />
                    </div>
                    <div className="">
                      <h3 className=" text-lg m-0">{project.name}</h3>
                    </div>
                  </div>
                  <p className="text-lg  m-0">{project.op} OP</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-xl bg-white p-4 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold"> Heres how you voted!</h3>
        <div className="text-[#68778D] grid grid-flow-col items-center justify-start gap-2">
          <LockClosedIcon className="w-4 h-4 " />
          <p>You vote will be private until the voting period ends</p>
        </div>
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead className="">
                <tr className="text-[#68778D] ">
                  <th>Project name</th>
                  <th className="">Category</th>
                  <th className="text-end">OP allocated by you</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="">
                  <td>
                    <div className=" grid justify-start gap-4  grid-flow-col">
                      <div className=" w-[80px]">
                        <Image
                          alt="project list"
                          height={"80"}
                          width={"80"}
                          src="/assets/gradient-bg.png"
                          className="w-full rounded-xl"
                        />
                      </div>
                      <div className=" self-center ">
                        <h3 className="font-bold text-lg m-0">Defillama</h3>
                        <p className="mt-0 text-[1.1rem] text-[#7f97b0] m-0">@defillama</p>
                      </div>
                    </div>
                  </td>
                  <td>Quality Control Specialist</td>
                  <td className="text-end">Blue</td>
                </tr>

                <tr className="">
                  <td>
                    <div className=" grid justify-start gap-4  grid-flow-col">
                      <div className=" w-[80px]">
                        <Image
                          alt="project list"
                          height={"80"}
                          width={"80"}
                          src="/assets/gradient-bg.png"
                          className="w-full rounded-xl"
                        />
                      </div>
                      <div className=" self-center ">
                        <h3 className="font-bold text-lg m-0">Defillama</h3>
                        <p className="mt-0 text-[1.1rem] text-[#7f97b0] m-0">@defillama</p>
                      </div>
                    </div>
                  </td>
                  <td>Quality Control Specialist</td>
                  <td className="text-end">Blue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-xl bg-white p-4 sm:p-8 shadow-sm">
        <h3 className="font-bold text-lg">Help us improve next round of RetroPGF</h3>
        <p className="text-[#68778D]">
          Your anonymized feedback will be influential to help us iterate on Optimisms RetroPGF process.
        </p>
        <div className="max-w-[192px]">
          <CustomProjectButton
            text="Share your feedback"
            customClassName=" bg-[#ff0000] px-2 py-2 rounded-lg border-[#ff0000]  text-[#ffffff]"
          ></CustomProjectButton>
        </div>
      </div>
    </div>
  );
};

export default VoteSuccess;
