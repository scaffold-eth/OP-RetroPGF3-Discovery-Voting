import { IState } from "~~/context/BallotContext";
import { ProjectDocument } from "~~/models/Project";

export const isAddedToBallot = (state: IState, project: ProjectDocument): boolean => {
  let isAdded = false;
  state.projects.forEach((item: any) => {
    if (item.id === project._id) isAdded = true;
  });
  return isAdded;
};
