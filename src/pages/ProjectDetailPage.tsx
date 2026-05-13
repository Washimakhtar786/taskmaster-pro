import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { Sidebar } from "../components/Sidebar";

import { TaskCreateEdit } from "../components/TaskCreateEdit";

import { TaskList } from "../components/TaskList";

interface Task {
  status:
    | "pending"
    | "in-progress"
    | "completed";
}

export const ProjectDetailPage: React.FC =
  () => {
    const { projectId } =
      useParams<{
        projectId: string;
      }>();

    const [tasks, setTasks] =
      useState<Task[]>([]);

    useEffect(() => {
      if (!projectId) return;

      const q = query(
        collection(db, "tasks"),
        where(
          "projectId",
          "==",
          projectId
        )
      );

      const unsubscribe =
        onSnapshot(
          q,
          (snapshot) => {
            const tasksData =
              snapshot.docs.map(
                (doc) =>
                  doc.data() as Task
              );

            setTasks(tasksData);
          }
        );

      return () => unsubscribe();
    }, [projectId]);

    const totalTasks =
      tasks.length;

    const completedTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "completed"
      ).length;

    const pendingTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "pending"
      ).length;

    const progressTasks =
      tasks.filter(
        (task) =>
          task.status ===
          "in-progress"
      ).length;

    return (
      <div className="flex min-h-screen bg-[#071B2A] text-white">

        <Sidebar />

        <main className="flex-1 p-10 overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-5xl font-extrabold">
                Project Workspace
              </h1>

              <p className="text-gray-400 mt-3">
                Manage tasks professionally
              </p>

            </div>

            <div className="bg-green-400/20 text-green-400 px-6 py-3 rounded-2xl font-bold">
              Active Project
            </div>

          </div>

          {/* REALTIME STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400">
                Total Tasks
              </p>

              <h2 className="text-5xl font-bold mt-4 text-green-400">
                {totalTasks}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400">
                Completed
              </p>

              <h2 className="text-5xl font-bold mt-4 text-green-400">
                {completedTasks}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400">
                Pending
              </p>

              <h2 className="text-5xl font-bold mt-4 text-green-400">
                {pendingTasks}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400">
                In Progress
              </p>

              <h2 className="text-5xl font-bold mt-4 text-green-400">
                {progressTasks}
              </h2>

            </div>

          </div>

          {/* Create Task */}
          <div className="mt-14">

            <div className="flex items-center mb-8">

              <h2 className="text-3xl font-bold">
                Create Task
              </h2>

              <div className="h-[2px] flex-1 bg-white/10 ml-6"></div>

            </div>

            <TaskCreateEdit
              projectId={projectId!}
            />

          </div>

          {/* Task List */}
          <div className="mt-16">

            <div className="flex items-center mb-8">

              <h2 className="text-3xl font-bold">
                Project Tasks
              </h2>

              <div className="h-[2px] flex-1 bg-white/10 ml-6"></div>

            </div>

            <TaskList
              projectId={projectId!}
            />

          </div>

        </main>

      </div>
    );
  };