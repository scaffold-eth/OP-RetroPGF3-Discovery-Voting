import { IState } from "~~/context/BallotContext";
import { IProject } from "~~/models/Project";

export const isAddedToBallot = (state: IState, project: IProject): boolean => {
  let isAdded = false;
  state.projects.forEach((item: any) => {
    if (item._id === project._id) isAdded = true;
  });

  return isAdded;
};
