import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import CustomProjectButton from "~~/components/op/btn/CustomProjectButton";

const VoteSuccess = () => {
  return (
    <div className=" mt-8 px-12">
      <div className="rounded-xl bg-white p-4 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold"> Heres how you voted!</h3>
        <div className="text-[#68778D] grid grid-flow-col items-center justify-start gap-2">
          <LockClosedIcon className="w-4 h-4 " />
          <p>You vote will be private until the voting period ends</p>
        </div>
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className="text-[#68778D]">
                  <th>Project name</th>
                  <th className="">Category</th>
                  <th className="text-end">OP allocated by you</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="border-t-[1px] border-[#68778D]">
                  <td>Cy Ganderton</td>
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
