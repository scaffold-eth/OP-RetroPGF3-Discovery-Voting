import React from "react";
import BaseModal from "./BaseModal";
import { WalletIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface IConfirmWalletModal {
  message: string;
  details?: string;
  onClose: () => void;
}
const ConfirmWalletModal: React.FC<IConfirmWalletModal> = ({ message, onClose, details }) => {
  return (
    <BaseModal onClose={onClose}>
      <div className="relative text-center max-w-[500px] md:w-[500px] flex flex-col gap-5 items-center justify-center bg-white rounded-xl p-8">
        <XMarkIcon onClick={onClose} className="w-8 h-8 text-[#a2aab6] cursor-pointer   absolute right-6 top-6" />
        <div className="p-2 w-fit rounded-xl bg-[#a2aab6]">
          <WalletIcon className="w-8 h-8 " />
        </div>
        <h3 className="text-lg font-bold mb-0">{message}</h3>
        {details && <p className="mt-0 text-[#a2aab6]">{details}</p>}
      </div>
    </BaseModal>
  );
};

export default ConfirmWalletModal;
