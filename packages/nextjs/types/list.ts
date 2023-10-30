import { ListDocument } from "~~/models/List";

interface IProjects {
  populatedProjects: {
    id: string;
    name: string;
    allocation: number;
    listId: string;
    profileImageUrl?: string;
  }[];
}
export type IList = ListDocument & IProjects;

export interface IProjectData {
  name: string;
  handle?: string;
  image?: string;
  allocation: number;
  _id: string;
  listId?: string;
  profileImageUrl?: string;
}
