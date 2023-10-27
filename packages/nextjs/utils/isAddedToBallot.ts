import { IState, Project, ProjectState } from "~~/context/BallotContext";

export const isAddedToBallot = (state: IState, project: Project): boolean => {
  let isAdded = false;
  state.projects.forEach((item: ProjectState) => {
    if (item._id === project._id) isAdded = true;
  });
  return isAdded;
};
