import React from "react";
import BaseModal from "./BaseModal";

interface ILoadingModal {
  message: string;
}
const LoadingModal: React.FC<ILoadingModal> = ({ message }) => {
  return (
    <BaseModal
      onClose={() => {
        console.log("working");
      }}
    >
      <div className=" w-fit md:w-[400px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-6">
        <div className="p-2 w-fit rounded-xl bg-[#D7E6F9]">
          {/* the spinner only works for updated version of daisyUI */}
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
        <h3 className="text-lg font-bold ">{message}</h3>
      </div>
    </BaseModal>
  );
};

export default LoadingModal;
