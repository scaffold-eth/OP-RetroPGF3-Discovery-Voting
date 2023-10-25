import { IState } from "~~/context/BallotContext";
import { Project } from "~~/models/Project";

export const isAddedToBallot = (state: IState, project: Project): boolean => {
  let isAdded = false;
  state.projects.forEach((item: any) => {
    if (item.id === project._id) isAdded = true;
  });
  return isAdded;
};
