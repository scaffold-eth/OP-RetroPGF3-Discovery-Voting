import { ListDocument } from "~~/models/List";

interface IProjects {
  populatedProjects: {
    id: string;
    name: string;
    votes: number;
    listId: string;
  }[];
}
export type IList = ListDocument & IProjects;
