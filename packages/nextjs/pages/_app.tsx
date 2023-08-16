import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ethers } from "ethers";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig, useAccount } from "wagmi";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { BallotProvider } from "~~/context/BallotContext";
import { ProjectsProvider } from "~~/context/ProjectsContext";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import { useEthersProvider } from "~~/utils/ethers";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [totalTokens, setTotalTokens] = useState(0);
  const { isDarkMode } = useDarkMode();
  // address to fetch vote token balance
  const { address } = useAccount();
  const provider = useEthersProvider();

  // Function to fetch vote token balance
  const fetchVoteTokensBalance = async (address: any) => {
    if (!address) return 0;
    // Define the contract ABI
    const ABI = ["function getVotes(address account) view returns (uint256)"];
    // OP Token address
    const OPToken = "0x4200000000000000000000000000000000000042";
    const OPTokenContract = new ethers.Contract(OPToken, ABI, provider);
    // Fetch balance for the connected wallet address
    const _allocation = await OPTokenContract.getVotes(address);
    const _tokenAllocation = Number(ethers.formatEther(_allocation));
    return _tokenAllocation;
  };

  useEffect(() => {
    // Fetch token balance when wallet address changes
    const fetchBalance = async () => {
      try {
        const balance = await fetchVoteTokensBalance(address);
        setTotalTokens(balance);
      } catch (e) {
        console.log("ERR_FETCHING_VOTING_BALANCE:", e);
      }
    };
    fetchBalance();
  }, [address]);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={isDarkTheme ? darkTheme() : lightTheme()}
      >
        <BallotProvider totalTokens={totalTokens > 0 ? totalTokens : 100}>
          <ProjectsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="relative flex flex-col flex-1">
                <Component {...pageProps} />
              </main>
              {/* <Footer /> */}
            </div>
            <Toaster />
          </ProjectsProvider>
        </BallotProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
