import BallotComponent from "../ballot/Ballot";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import { ArrowLeftOnRectangleIcon, ArrowsRightLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-sm btn-primary h-10 mr-2 rounded-full"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect wallet
                  </button>
                );
              }

              if (chain.unsupported || chain.id !== configuredNetwork.id) {
                return (
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle">
                      <span>Wrong network</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 mt-1 shadow-lg bg-base-100 rounded-box">
                      <li>
                        <button
                          className="menu-item"
                          type="button"
                          onClick={() => switchNetwork?.(configuredNetwork.id)}
                        >
                          <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">
                            Switch to <span style={{ color: networkColor }}>{configuredNetwork.name}</span>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button className="menu-item text-error" type="button" onClick={() => disconnect()}>
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              }

              return (
                <div className="sm:px-2 flex sm:justify-end sm:items-center">
                  <div className="flex  sm:justify-center gap-1 flex-col sm:flex-row sm:items-center border-1 rounded-lg">
                    <BallotComponent />
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="btn btn-secondary rounded-full h-10 btn-sm pl-2 pr-2 border-2 border-slate-200 hover:bg-slate-100"
                    >
                      <BlockieAvatar address={account.address} size={7} ensImage={account.ensAvatar} />
                      <span className="ml-2 mr-1">{account.displayName}</span>
                      <span>
                        <ChevronDownIcon className="h-6 w-4" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
