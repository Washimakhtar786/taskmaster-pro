import React, {
  useEffect,
  useState,
} from "react";

import { Sidebar } from "../components/Sidebar";

import { DashboardCharts } from "../components/DashboardCharts";

import { useAuth } from "../contexts/AuthContext";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useNavigate } from "react-router-dom";

interface TaskAnalytics {
  name: string;
  value: number;
}

export const DashboardPage: React.FC =
  () => {

    const { user } =
      useAuth();

    const navigate =
      useNavigate();

    const [
      totalProjects,
      setTotalProjects,
    ] = useState(0);

    const [
      totalTasks,
      setTotalTasks,
    ] = useState(0);

    const [
      taskStatusCounts,
      setTaskStatusCounts,
    ] = useState<
      TaskAnalytics[]
    >([
      {
        name: "Pending",
        value: 0,
      },

      {
        name: "In Progress",
        value: 0,
      },

      {
        name: "Completed",
        value: 0,
      },
    ]);

    /* =========================
       CREATE PROJECT
    ========================== */
    const createProject =
      async () => {

        if (!user) {

          alert(
            "User not logged in"
          );

          return;
        }

        try {

          const docRef =
            await addDoc(
              collection(
                db,
                "projects"
              ),
              {
                name:
                  "New Project",

                description:
                  "Project description",

                ownerId:
                  user.uid,

                createdAt:
                  serverTimestamp(),
              }
            );

          console.log(
            "Project Created:",
            docRef.id
          );

          navigate(
            `/projects/${docRef.id}`
          );

        } catch (error) {

          console.log(error);

          alert(
            "Failed to create project"
          );

        }

      };

    /* =========================
       REALTIME PROJECTS
    ========================== */
    useEffect(() => {

      if (!user) return;

      const q = query(
        collection(
          db,
          "projects"
        ),

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

            setTotalProjects(
              snapshot.docs.length
            );

          }
        );

      return () =>
        unsubscribe();

    }, [user]);

    /* =========================
       REALTIME TASKS
    ========================== */
    useEffect(() => {

      if (!user) return;

      const q = query(
        collection(
          db,
          "tasks"
        ),

        where(
          "projectOwnerId",
          "==",
          user.uid
        )
      );

      const unsubscribe =
        onSnapshot(
          q,
          (snapshot) => {

            const tasks =
              snapshot.docs.map(
                (doc) =>
                  doc.data()
              );

            setTotalTasks(
              tasks.length
            );

            const counts = {
              pending: 0,

              "in-progress": 0,

              completed: 0,
            };

            tasks.forEach(
              (task: any) => {

                counts[
                  task.status
                ]++;

              }
            );

            setTaskStatusCounts([
              {
                name:
                  "Pending",

                value:
                  counts.pending,
              },

              {
                name:
                  "In Progress",

                value:
                  counts[
                    "in-progress"
                  ],
              },

              {
                name:
                  "Completed",

                value:
                  counts.completed,
              },
            ]);

          }
        );

      return () =>
        unsubscribe();

    }, [user]);

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
                Dashboard
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Welcome back,
                {" "}
                {user?.email}
              </p>

            </div>

            {/* Create Project */}
            <button
              onClick={
                createProject
              }
              className="bg-green-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-green-300 transition shadow-lg shadow-green-400/20"
            >
              Create Project
            </button>

          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            {/* Total Projects */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg hover:border-green-400/30 transition">

              <h2 className="text-gray-400 text-lg">
                Total Projects
              </h2>

              <p className="text-6xl font-bold mt-5 text-green-400">
                {totalProjects}
              </p>

            </div>

            {/* Active Tasks */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg hover:border-green-400/30 transition">

              <h2 className="text-gray-400 text-lg">
                Active Tasks
              </h2>

              <p className="text-6xl font-bold mt-5 text-green-400">
                {totalTasks}
              </p>

            </div>

            {/* Completed Tasks */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg hover:border-green-400/30 transition">

              <h2 className="text-gray-400 text-lg">
                Completed Tasks
              </h2>

              <p className="text-6xl font-bold mt-5 text-green-400">
                {
                  taskStatusCounts[2]
                    .value
                }
              </p>

            </div>

          </div>

          {/* Charts */}
          <div className="mt-16">

            <DashboardCharts
              taskStatusCounts={
                taskStatusCounts
              }
            />

          </div>

        </main>

      </div>
    );
  };