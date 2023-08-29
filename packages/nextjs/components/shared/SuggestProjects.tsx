import React from "react";
import Card from "../projects/Card";

interface Project {
  id: number;
  banner: string;
  logo: string;
  name: string;
  description: string;
  category: string;
}

function SuggestProjects({ suggestedProjects }: any) {
  return (
    <div className="pt-16 pb-24">
      <h3 className="font-bold text-2xl leading-8 ">You may be also interested</h3>
      <p className="text-lightGray text-[17px] leading-5">Discover more popular projects</p>
      <div className="grid pt-4 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {suggestedProjects.length > 0 ? (
          suggestedProjects.map((project: Project) => <Card key={project.id} project={project} display="grids" />)
        ) : (
          <div className="text-xl">
            <h1>No suggested projects available...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestProjects;
