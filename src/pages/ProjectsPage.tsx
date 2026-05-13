import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { Link } from "react-router-dom";

import { db } from "../api/firebase";

import { useAuth } from "../contexts/AuthContext";

import { Sidebar } from "../components/Sidebar";

interface Project {
  id: string;
  name: string;
  description: string;
}

export const ProjectsPage: React.FC =
  () => {
    const { user } = useAuth();

    const [projects, setProjects] =
      useState<Project[]>([]);

    const [name, setName] =
      useState("");

    const [
      description,
      setDescription,
    ] = useState("");

    const [editingId, setEditingId] =
      useState<string | null>(
        null
      );

    useEffect(() => {
      if (!user) return;

      const q = query(
        collection(db, "projects"),

        where(
          "ownerId",
          "==",
          user.uid
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

    const createProject =
      async (
        e: React.FormEvent
      ) => {
        e.preventDefault();

        if (!user) return;

        if (!name.trim())
          return;

        try {
          await addDoc(
            collection(
              db,
              "projects"
            ),
            {
              name,
              description,
              ownerId:
                user.uid,
              createdAt:
                serverTimestamp(),
            }
          );

          setName("");

          setDescription("");

        } catch (error) {
          console.log(error);
        }
      };

    const deleteProject =
      async (
        projectId: string
      ) => {
        try {
          await deleteDoc(
            doc(
              db,
              "projects",
              projectId
            )
          );
        } catch (error) {
          console.log(error);
        }
      };

    const editProject =
      async (
        e: React.FormEvent,
        projectId: string
      ) => {
        e.preventDefault();

        try {
          await updateDoc(
            doc(
              db,
              "projects",
              projectId
            ),
            {
              name,
              description,
            }
          );

          setEditingId(null);

          setName("");

          setDescription("");

        } catch (error) {
          console.log(error);
        }
      };

    return (
      <div className="flex min-h-screen bg-[#071B2A] text-white">

        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <main className="flex-1 p-10 overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-5xl font-extrabold">
                Projects
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Manage all your projects professionally
              </p>

            </div>

          </div>

          {/* Create/Edit Project */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">

            <h2 className="text-3xl font-bold mb-8">
              {editingId
                ? "Edit Project"
                : "Create New Project"}
            </h2>

            <form
              onSubmit={(e) =>
                editingId
                  ? editProject(
                      e,
                      editingId
                    )
                  : createProject(e)
              }
              className="space-y-6"
            >

              <input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none placeholder:text-gray-400"
              />

              <textarea
                placeholder="Project Description"
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none placeholder:text-gray-400 h-36"
              />

              <div className="flex items-center gap-4">

                <button
                  type="submit"
                  className="bg-green-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-green-300 transition"
                >
                  {editingId
                    ? "Update Project"
                    : "Create Project"}
                </button>

                {editingId && (

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(
                        null
                      );

                      setName("");

                      setDescription(
                        ""
                      );
                    }}
                    className="bg-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition"
                  >
                    Cancel
                  </button>

                )}

              </div>

            </form>

          </div>

          {/* Projects */}
          <div className="mt-16">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold">
                Your Projects
              </h2>

              <div className="h-[2px] flex-1 bg-white/10 ml-6"></div>

            </div>

            {projects.length ===
            0 ? (

              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-gray-400">
                No projects found.
              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {projects.map(
                  (project) => (

                    <Link
                      key={
                        project.id
                      }
                      to={`/projects/${project.id}`}
                      className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-green-400/40 hover:scale-[1.02] transition-all duration-300 backdrop-blur-lg"
                    >

                      {/* Header */}
                      <div className="flex items-center justify-between">

                        <h3 className="text-2xl font-bold">
                          {
                            project.name
                          }
                        </h3>

                        <div className="w-4 h-4 rounded-full bg-green-400"></div>

                      </div>

                      {/* Description */}
                      <p className="text-gray-400 mt-5 leading-7">
                        {
                          project.description ||
                          "No description"
                        }
                      </p>

                      {/* Actions */}
                      <div className="mt-8 flex items-center justify-between gap-3">

                        <span className="text-sm text-green-400 font-semibold">
                          Open Workspace →
                        </span>

                        <div className="flex items-center gap-3">

                          <button
                            onClick={(
                              e
                            ) => {
                              e.preventDefault();

                              setEditingId(
                                project.id
                              );

                              setName(
                                project.name
                              );

                              setDescription(
                                project.description
                              );
                            }}
                            className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl hover:bg-yellow-500/30 transition text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={(
                              e
                            ) => {
                              e.preventDefault();

                              deleteProject(
                                project.id
                              );
                            }}
                            className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/30 transition text-sm"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </Link>

                  )
                )}

              </div>

            )}

          </div>

        </main>

      </div>
    );
  };