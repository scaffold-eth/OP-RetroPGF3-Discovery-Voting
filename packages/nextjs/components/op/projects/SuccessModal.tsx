import React from "react";
import BaseModal from "./BaseModal";
import { ShieldCheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface ISuccessModal {
  message: string;
  onClose: () => void;
}
const SuccessModal: React.FC<ISuccessModal> = ({ message, onClose }) => {
  return (
    <BaseModal onClose={onClose}>
      <div className="relative w-fit md:w-[400px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-6">
        <XMarkIcon onClick={onClose} className="w-6 h-6 cursor-pointer   absolute right-4 top-4" />
        <div className="p-2 w-fit rounded-xl bg-[#DEEDDE]">
          <ShieldCheckIcon className="w-8 h-8 text-[#3D8A40]" />
        </div>
        <h3 className="text-lg font-bold ">{message}</h3>
      </div>
    </BaseModal>
  );
};

export default SuccessModal;
