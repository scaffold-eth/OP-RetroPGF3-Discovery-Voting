import Project from "../models/Project";

// @dev
// populates shared projects on a list with
// relevant project data for use in components.
// Shared projects on lists appear as 'objectIds' from the database
// this helper function helps to get the project's data (id, name, and allocation)
export const populateListProjects = async (list: any) => {
  let x = {};
  const y = [];
  for (let i = 0; i < list.projects.length; i++) {
    const projectId = list.projects[i].project;
    const p = await Project.findById(projectId);
    const v = list.projects[i].allocation;
    x = {
      id: p._id,
      name: p.name,
      allocation: v,
      profileImageUrl: p.profileImageUrl,
      listId: list._id,
    };
    y.push(x);
  }
  // 'List' object fetched from db has a type of:
  // 'mongoose.Model<any, ..., any>'
  // contents of the 'list' is contained in the '_doc' property
  // we copy 'list' contents and add a new property 'populatedProjects'
  return { ...list._doc, populatedProjects: y };
};
