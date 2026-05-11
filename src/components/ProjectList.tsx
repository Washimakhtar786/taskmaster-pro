import { Link } from "react-router-dom";

import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useAuth } from "../contexts/AuthContext";

interface Project {
  id: string;
  name: string;
  description?: string;
}

export const ProjectList: React.FC =
  () => {
    const { user } = useAuth();

    const [projects, setProjects] =
      useState<Project[]>([]);

    useEffect(() => {
      if (!user) return;

      const q = query(
        collection(db, "projects"),

        where(
          "ownerId",
          "==",
          user.uid
        ),

        orderBy(
          "createdAt",
          "desc"
        )
      );

      const unsubscribe =
        onSnapshot(
          q,
          (snapshot) => {
            const projectData =
              snapshot.docs.map(
                (doc) => ({
                  id: doc.id,

                  ...(doc.data() as Omit<
                    Project,
                    "id"
                  >),
                })
              );

            setProjects(
              projectData
            );
          }
        );

      return () => unsubscribe();
    }, [user]);

    if (!user) return null;

    return (
      <div>
        <h2>Your Projects</h2>

        {projects.length === 0 ? (
          <p>
            No projects yet.
          </p>
        ) : (
          <ul>
            {projects.map(
              (project) => (
                <li
                  key={project.id}
                >
                  <Link
                     to={`/projects/${project.id}`}
                  >
                     <strong>
                       {project.name}
                     </strong>
                </Link>

                  <p>
                    {
                      project.description
                    }
                  </p>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    );
  };