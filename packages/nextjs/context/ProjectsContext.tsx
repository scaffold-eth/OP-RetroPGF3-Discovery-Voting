import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ProjectDocument } from "~~/models/Project";

interface ProjectsContextValue {
  projects: ProjectDocument[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectDocument[]>>;
}
const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);
interface ProjectsProviderProps {
  children: ReactNode;
}
export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectDocument[]>([]);
  useEffect(() => {
    fetch("/api/projects")
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);
  return <ProjectsContext.Provider value={{ projects, setProjects }}>{children}</ProjectsContext.Provider>;
};
