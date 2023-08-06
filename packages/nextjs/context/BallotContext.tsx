import React, { ReactNode, createContext, useContext, useReducer } from "react";

// Interface for project to be added to the ballot
interface Project {
  id: string;
  name: string;
  allocation: number;
}
// Interface for projects shared via list
interface SharedProject {
  id: string;
  name: string;
  votes: number;
  listId: string;
}
// Interface for ballot state
interface State {
  projects: Project[];
  totalTokens: number;
  importedLists: string[];
}

interface BallotProviderProps {
  children: ReactNode;
  totalTokens: number;
}

type Action =
  | { type: "ADD_PROJECT"; project: Project; allocation: number }
  | { type: "UPDATE_ALLOCATION"; projectId: string; newAllocation: number }
  | { type: "REMOVE_PROJECT"; targetId: string }
  | { type: "ADD_LIST"; projects: SharedProject[] };

// The context value structure
interface BallotContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Create the context
const BallotContext = createContext<BallotContextValue | undefined>(undefined);

// Reducer function for managing state updates
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
    case "ADD_LIST":
      const listId = action.projects[0].listId;
      // Check if the list has already been imported
      if (state.importedLists.includes(listId)) {
        return state;
      }
      const newProjects = [...state.projects];
      const usedAllocation = state.projects.reduce((sum, p) => sum + p.allocation, 0);
      const remainingAllocation = state.totalTokens - usedAllocation;
      const listTotalAllocation = action.projects.reduce((sum, p) => sum + p.votes, 0);
      let scalingFactor = 1;
      if (listTotalAllocation > remainingAllocation) scalingFactor = remainingAllocation / listTotalAllocation;

      action.projects.forEach(listItem => {
        const existingProjectIndex = newProjects.findIndex(project => project.id === listItem.id);
        const additionalVotes = Math.round(listItem.votes * scalingFactor);

        if (existingProjectIndex !== -1) {
          // If project already exists, update its allocation.
          newProjects[existingProjectIndex].allocation += additionalVotes;
        } else {
          // If project does not exist, add it to the ballot.
          newProjects.push({
            id: listItem.id,
            name: listItem.name,
            allocation: additionalVotes,
          });
        }
      });

      return {
        ...state,
        projects: newProjects,
        importedLists: [...state.importedLists, listId],
      };
    // additional cases as needed
    default:
      return state;
  }
};
// Provider component
export const BallotProvider: React.FC<BallotProviderProps> = ({ children, totalTokens }) => {
  const [state, dispatch] = useReducer(reducer, { projects: [], totalTokens, importedLists: [] });
  return <BallotContext.Provider value={{ state, dispatch }}>{children}</BallotContext.Provider>;
};

// Custom hook to use the context
export const useBallot = () => {
  const context = useContext(BallotContext);
  if (!context) {
    throw new Error("useBallot must be used within a BallotProvider");
  }
  return context;
};
