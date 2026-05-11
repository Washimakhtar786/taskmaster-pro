import React from "react";

import { ProjectCreate } from "../components/ProjectCreate";

import { ProjectList } from "../components/ProjectList";
import { Navbar } from "../components/Navbar";

export const ProjectsPage: React.FC =
  () => {
    return (
      <div>

        <Navbar />
        <h1>Projects</h1>

        <ProjectCreate />

        <hr />

        <ProjectList />
      </div>
    );
  };