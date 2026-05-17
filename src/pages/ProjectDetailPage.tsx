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

        <main className="flex-1 p-4 md:p-10 pt-24 md:pt-10 overflow-y-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Project Workspace
              </h1>

              <p className="text-gray-400 mt-3 text-base md:text-lg">
                Manage tasks professionally
              </p>

            </div>

            <div className="w-full md:w-auto bg-green-400/20 text-green-400 px-6 py-3 rounded-2xl font-bold text-center">
              Active Project
            </div>

          </div>

          {/* REALTIME STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-12">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">

              <p className="text-gray-400">
                Total Tasks
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-green-400">
                {totalTasks}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">

              <p className="text-gray-400">
                Completed
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-green-400">
                {completedTasks}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">

              <p className="text-gray-400">
                Pending
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-green-400">
                {pendingTasks}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">

              <p className="text-gray-400">
                In Progress
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mt-4 text-green-400">
                {progressTasks}
              </h2>

            </div>

          </div>

          {/* Create Task */}
          <div className="mt-12 md:mt-14">

            <div className="flex items-center mb-8">

              <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
                Create Task
              </h2>

              <div className="h-[2px] flex-1 bg-white/10 ml-4 md:ml-6"></div>

            </div>

            <TaskCreateEdit
              projectId={projectId!}
            />

          </div>

          {/* Task List */}
          <div className="mt-14 md:mt-16">

            <div className="flex items-center mb-8">

              <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
                Project Tasks
              </h2>

              <div className="h-[2px] flex-1 bg-white/10 ml-4 md:ml-6"></div>

            </div>

            <TaskList
              projectId={projectId!}
            />

          </div>

        </main>

      </div>

    );

  };