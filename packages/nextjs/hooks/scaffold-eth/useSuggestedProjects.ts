import { useEffect, useState } from "react";

export function useSuggestedProjects(category: any, currentProjectId: string) {
  const [suggestedProjects, setSuggestedProjects] = useState([]);

  useEffect(() => {
    const getSuggestedProjectsByCategory = async () => {
      try {
        const response = await fetch(
          `/api/suggestedProjects?category=${category}&currentProjectId=${currentProjectId}`,
        );
        const data = await response.json();
        setSuggestedProjects(data);
      } catch (error) {
        console.error("Error fetching /api/suggested-projects/category", error);
        throw error;
      }
    };
    if (category && currentProjectId) {
      getSuggestedProjectsByCategory();
    }
  }, [category, currentProjectId]);

  return {
    suggestedProjects,
  };
}
