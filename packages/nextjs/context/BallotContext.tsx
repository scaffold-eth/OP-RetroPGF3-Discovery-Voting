import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { IProject } from "~~/models/Project";
import { IProjectList } from "~~/types/list";

// Interface for project to be added to the ballot
export interface ProjectExtensions {
  allocation: number;
  listId: string;
}

export type ProjectState = Pick<Project, "_id" | "name" | "allocation">;

export type Project = IProject & ProjectExtensions;

// Interface for ballot state
export interface IState {
  projects: ProjectState[];
  totalTokens: number;
  importedLists: string[];
}

interface BallotProviderProps {
  children: ReactNode;
  totalTokens: number;
}

type Action =
  | { type: "LOAD_STATE"; stateData: IState }
  | { type: "ADD_PROJECT"; project: ProjectState }
  | { type: "UPDATE_ALLOCATION"; projectId: string; newAllocation: number }
  | { type: "REMOVE_PROJECT"; targetId: string }
  | { type: "ADD_LIST"; projects: IProjectList[] }
  | { type: "ADD_EDITED_LIST"; projects: IProjectList[] };

// The ballot context structure
interface BallotContextValue {
  state: IState;
  dispatch: React.Dispatch<Action>;
}

// Create the context
const BallotContext = createContext<BallotContextValue | undefined>(undefined);

// Reducer function for managing state updates
const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "LOAD_STATE":
      //return action stateData if it exist else return state
      return action.stateData ? action.stateData : state;

    case "ADD_PROJECT":
      // logic to add project to the ballot
      const { project } = action;
      if (state.projects.some(p => p._id === project._id)) {
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
      const otherProjectsTotal = state.projects.reduce((sum, p) => (p._id !== projectId ? sum + p.allocation : sum), 0);
      if (newAllocation + otherProjectsTotal > state.totalTokens) {
        // New allocation exceeds total tokens
        return state;
      }
      return {
        ...state,
        projects: state.projects.map(p => (p._id === projectId ? { ...p, allocation: newAllocation } : p)),
      };
    case "REMOVE_PROJECT":
      // logic to remove a project from the ballot
      const { targetId } = action;
      return {
        ...state,
        projects: state.projects.filter(p => p._id !== targetId),
      };
    case "ADD_LIST":
      const listId = action.projects[0].listId;
      const newProjects = [...state.projects];
      const usedAllocation = state.projects.reduce((sum, p) => sum + p.allocation, 0);
      const remainingAllocation = state.totalTokens - usedAllocation;
      const listTotalAllocation = action.projects.reduce((sum, p) => sum + p.allocation, 0);
      // Check if the list has already been imported
      if (state.importedLists.includes(listId) && state.projects.length >= action.projects.length) {
        return state;
      }
      let scalingFactor = 1;
      // ballot already contains projects with allocation, add new projects based on
      // the remaining available votes of the delegate else add as is on the list i.e scaling factor = 1
      if (listTotalAllocation > remainingAllocation) scalingFactor = remainingAllocation / listTotalAllocation;

      action.projects.forEach(listItem => {
        const existingProjectIndex = newProjects.findIndex(project => project._id === listItem._id);
        const additionalVotes = Math.round(listItem.allocation * scalingFactor);

        if (existingProjectIndex !== -1) {
          // If project already exists, update its allocation.
          newProjects[existingProjectIndex].allocation += additionalVotes;
        } else {
          // If project does not exist, add it to the ballot.
          newProjects.push(
            Object.assign(listItem, {
              allocation: additionalVotes,
            }),
          );
        }
      });

      return {
        ...state,
        projects: newProjects,
        importedLists: [...state.importedLists, listId],
      };
    case "ADD_EDITED_LIST":
      const previousProjects = [...state.projects];
      const targetlistId = action.projects[0].listId;

      // Iterate over the projects in the edited list
      action.projects.forEach(editedProject => {
        // Find the corresponding project in the ballot
        const indexInBallot = previousProjects.findIndex(project => project._id === editedProject._id);

        // If found, update its allocation
        if (indexInBallot !== -1) {
          previousProjects[indexInBallot].allocation = editedProject.allocation;
        } else {
          // If it's not found, add it to the ballot
          previousProjects.push(
            Object.assign(editedProject, {
              allocation: editedProject.allocation,
            }),
          );
        }
      });

      // Return the new state with the updated projects
      return {
        ...state,
        projects: previousProjects,
        importedLists: [...state.importedLists, targetlistId],
      };
    // additional cases as needed
    default:
      return state;
  }
};
// Provider component
export const BallotProvider: React.FC<BallotProviderProps> = ({ children, totalTokens }) => {
  const [state, dispatch] = useReducer(reducer, { projects: [], totalTokens, importedLists: [] });

  // Load state from local storage on initial render
  React.useEffect(() => {
    const localStorageBallot = localStorage.getItem("ballotState");
    if (localStorageBallot) {
      const ballotData = JSON.parse(localStorageBallot) as IState;
      if (ballotData.projects?.length) {
        dispatch({ type: "LOAD_STATE", stateData: JSON.parse(localStorageBallot) });
      }
    }
  }, []);

  // Update local storage whenever the state changes
  React.useEffect(() => {
    if (state.projects.length || state.importedLists.length) {
      localStorage.setItem("ballotState", JSON.stringify(state));
    }
  }, [state]);

  return <BallotContext.Provider value={{ state, dispatch }}>{children}</BallotContext.Provider>;
};

// Hook to use the context
export const useBallot = () => {
  const context = useContext(BallotContext);
  if (!context) {
    throw new Error("useBallot must be used within a BallotProvider");
  }
  return context;
};
