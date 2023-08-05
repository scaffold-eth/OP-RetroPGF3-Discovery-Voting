import React, { ReactNode, createContext, useContext, useReducer } from "react";

// Define the structure of the project and the ballot state
interface Project {
  id: string;
  name: string;
  allocation: number;
}

interface State {
  projects: Project[];
  totalTokens: number; // Define other properties as needed
}

interface BallotProviderProps {
  children: ReactNode;
  totalTokens: number;
}
// Define the actions for modifying the ballot
type Action =
  | { type: "ADD_PROJECT"; project: Project; allocation: number }
  | { type: "UPDATE_ALLOCATION"; projectId: string; newAllocation: number }
  | { type: "REMOVE_PROJECT"; targetId: string };

// Define the context value structure
interface BallotContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Create the context
const BallotContext = createContext<BallotContextValue | undefined>(undefined);

// Define the reducer function for managing state updates
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_PROJECT":
      // logic to add project to the ballot
      const { project } = action;
      if (state.projects.some(p => p.id === project.id)) {
        // Project already exists in the ballot
        return state;
      }
      if (project.allocation + state.projects.reduce((sum, p) => sum + p.allocation, 0) > state.totalTokens) {
        // Allocation exceeds total tokens delegated to the delegate
        return state;
      }
      return { ...state, projects: [...state.projects, project] };
    case "UPDATE_ALLOCATION":
      // logic to update the token allocation for a project
      const { projectId, newAllocation } = action;
      const otherProjectsTotal = state.projects.reduce((sum, p) => (p.id !== projectId ? sum + p.allocation : sum), 0);
      if (newAllocation + otherProjectsTotal > state.totalTokens) {
        // New allocation exceeds total tokens
        return state;
      }
      return {
        ...state,
        projects: state.projects.map(p => (p.id === projectId ? { ...p, allocation: newAllocation } : p)),
      };
    case "REMOVE_PROJECT":
      // logic to remove a project from the ballot
      const { targetId } = action;
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== targetId),
      };
    // additional cases as needed
    default:
      return state;
  }
};
// Create the provider component
export const BallotProvider: React.FC<BallotProviderProps> = ({ children, totalTokens }) => {
  const [state, dispatch] = useReducer(reducer, { projects: [], totalTokens });
  //   const { address } = useAccount();
  //   const provider = useEthersProvider();

  //   // Function to fetch token balance
  //   const fetchVotesTokenBalance = async () => {
  //     if (!address) return;
  //     // Define the contract ABI
  //     const ABI = ["function getVotes(address account) view returns (uint256)"];

  //     // ERC-20 contract address
  //     const OPToken = "0x4200000000000000000000000000000000000042";

  //     // Create a contract instance
  //     const OPTokenContract = new ethers.Contract(OPToken, ABI, provider);

  //     // Fetch balance for the connected wallet address
  //     const _tokenAllocation = await OPTokenContract.getVotes(address);
  //     console.log("TOKENS::", _tokenAllocation);
  //     // Update state with fetched getVotes
  //     // dispatch({ type: "SET_TOTAL_TOKENS", totalTokens: Number(ethers.utils.formatUnits(_tokenAllocation, 18)) });
  //     dispatch({ type: "SET_TOTAL_TOKENS", totalTokens: Number(ethers.formatEther(_tokenAllocation)) });
  //   };
  //   useEffect(() => {
  //     // Fetch token balance when wallet address changes
  //     fetchVotesTokenBalance();
  //   }, [address]);
  return <BallotContext.Provider value={{ state, dispatch }}>{children}</BallotContext.Provider>;
};

// Create a custom hook to use the context
export const useBallot = () => {
  const context = useContext(BallotContext);
  if (!context) {
    throw new Error("useBallot must be used within a BallotProvider");
  }
  return context;
};
