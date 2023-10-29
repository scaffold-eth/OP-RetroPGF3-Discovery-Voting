import { ListDocument } from "~~/models/List";

interface IProjects {
  populatedProjects: IProjectList[];
}

export interface IProjectList {
  _id: string;
  name: string;
  allocation: number;
  listId: string;
}

export type IList = ListDocument & IProjects;
