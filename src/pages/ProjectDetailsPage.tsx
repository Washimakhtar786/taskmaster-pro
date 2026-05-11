import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { Navbar } from "../components/Navbar";

interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
}

export const ProjectDetailsPage:
  React.FC = () => {
    const { projectId } =
      useParams();

    const [project, setProject] =
      useState<Project | null>(
        null
      );

    const [loading, setLoading] =
      useState(true);

    useEffect(() => {
      const fetchProject =
        async () => {
          if (!projectId) return;

          try {
            const projectRef = doc(
              db,
              "projects",
              projectId
            );

            const projectSnap =
              await getDoc(
                projectRef
              );

            if (
              projectSnap.exists()
            ) {
              setProject({
                id: projectSnap.id,

                ...(projectSnap.data() as Omit<
                  Project,
                  "id"
                >),
              });
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };

      fetchProject();
    }, [projectId]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!project) {
      return (
        <p>
          Project not found
        </p>
      );
    }

    return (
      <div>
        <Navbar />

        <h1>
          {project.name}
        </h1>

        <p>
          {project.description}
        </p>
      </div>
    );
  };