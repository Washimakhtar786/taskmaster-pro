import React from "react";

import { ProjectCreate } from "../components/ProjectCreate";

import { ProjectList } from "../components/ProjectList";

export const ProjectsPage: React.FC =
  () => {
    return (
      <div>
        <h1>Projects</h1>

        <ProjectCreate />

        <hr />

        <ProjectList />
      </div>
    );
  };