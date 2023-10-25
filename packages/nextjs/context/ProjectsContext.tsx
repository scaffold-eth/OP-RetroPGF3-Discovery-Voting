import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Project } from "~~/context/BallotContext";

interface ProjectsContextValue {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
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
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/projects")
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);
  return <ProjectsContext.Provider value={{ projects, setProjects }}>{children}</ProjectsContext.Provider>;
};
