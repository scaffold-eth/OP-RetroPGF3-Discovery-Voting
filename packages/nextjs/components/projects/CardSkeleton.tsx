import React from "react";

const CardSkeleton = ({ project, display }: any) => {
  console.log(project);
  return (
    <div className="">
      {display === "grids" ? (
        <div className="rounded-[1.5rem] animate-pulse p-4 bg-base-100 ">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <div className="flex-shrink-0 w-[320px]  h-[112px] rounded-lg bg-gray-300"></div>

            <div className="mt-[-22px] ml-[20px] p-1 bg-white overflow-hidden w-14 h-14 rounded inline-block">
              <div className="bg-gray-300 w-full h-full"></div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-1">
              <div className="w-full h-4 rounded bg-gray-300 mt-2"></div>

              <div className="flex items-center">
                <div className="w-full h-4 rounded bg-gray-300 mt-2"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-4 rounded bg-gray-300 mt-2"></div>

          <div className="flex items-center justify-between py-2">
            <div className="w-full h-4 rounded bg-gray-300 mt-2"></div>
          </div>
        </div>
      ) : (
        <div className="flex  animate-pulse border rounded-[1.5rem] border-gray-300  p-4 ">
          <div className=" p-1   bg-white overflow-hidden w-14 h-14 rounded inline-block">
            <div className="bg-gray-300  w-full h-full"></div>
          </div>
          <div className="ml-6 w-full">
            <div className="w-full h-4 rounded bg-gray-300 mt-2"></div>

            <div className="w-full h-4 rounded bg-gray-300 mt-2"></div>
            <div className="flex max-w-[50%] items-center justify-between py-2">
              <div className="w-full h-4 rounded bg-gray-300 mt-2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;
