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

export const ProjectsPage:
  React.FC = () => {
    const { user } = useAuth();

    const [projects, setProjects] =
      useState<Project[]>([]);

    const [name, setName] =
      useState("");

    const [
      description,
      setDescription,
    ] = useState("");

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

          {/* Create Project Form */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">

            <h2 className="text-3xl font-bold mb-8">
              Create New Project
            </h2>

            <form
              onSubmit={
                createProject
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

              <button
                type="submit"
                className="bg-green-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-green-300 transition"
              >
                Create Project
              </button>

            </form>

          </div>

          {/* Projects Grid */}
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

                      <div className="flex items-center justify-between">

                        <h3 className="text-2xl font-bold">
                          {
                            project.name
                          }
                        </h3>

                        <div className="w-4 h-4 rounded-full bg-green-400"></div>

                      </div>

                      <p className="text-gray-400 mt-5 leading-7">
                        {
                          project.description ||
                          "No description"
                        }
                      </p>

                      <div className="mt-8 flex items-center justify-between">

                        <span className="text-sm text-green-400 font-semibold">
                          Open Workspace →
                        </span>

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