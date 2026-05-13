import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { CommentForm } from "./CommentForm";

import { CommentList } from "./CommentList";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  status:
    | "pending"
    | "in-progress"
    | "completed";
  priority:
    | "low"
    | "medium"
    | "high";
  dueDate?: string;
}

interface Props {
  projectId: string;
}

export const TaskList: React.FC<
  Props
> = ({ projectId }) => {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  useEffect(() => {
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
          const taskData =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<
                  Task,
                  "id"
                >),
              })
            );

          setTasks(taskData);
        },
        (error) => {
          console.log(
            "Firestore Error:",
            error
          );
        }
      );

    return () => unsubscribe();
  }, [projectId]);

  const deleteTask = async (
    taskId: string
  ) => {
    try {
      await deleteDoc(
        doc(db, "tasks", taskId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10">

      {tasks.length === 0 ? (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-gray-400">
          No tasks for this project.
        </div>

      ) : (

        <div className="grid grid-cols-1 gap-8">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg hover:border-green-400/30 transition"
            >

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <h3 className="text-3xl font-bold text-white">
                    {task.title}
                  </h3>

                  <p className="text-gray-400 mt-3 leading-7">
                    {task.description ||
                      "No description"}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span className="bg-green-400/20 text-green-400 px-4 py-2 rounded-xl text-sm font-semibold capitalize">
                    {task.priority}
                  </span>

                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize
                    ${
                      task.status ===
                      "completed"
                        ? "bg-green-500/20 text-green-400"
                        : task.status ===
                          "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {task.status}
                  </span>

                </div>

              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

                  <p className="text-sm text-gray-400">
                    Assigned To
                  </p>

                  <p className="text-white font-semibold mt-2 break-all">
                    {task.assignedTo}
                  </p>

                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

                  <p className="text-sm text-gray-400">
                    Due Date
                  </p>

                  <p className="text-white font-semibold mt-2">
                    {task.dueDate ||
                      "N/A"}
                  </p>

                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

                  <p className="text-sm text-gray-400">
                    Task Status
                  </p>

                  <p className="text-white font-semibold mt-2 capitalize">
                    {task.status}
                  </p>

                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-end mt-8">

                <button
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                  className="bg-red-500/20 text-red-400 px-6 py-3 rounded-2xl hover:bg-red-500/30 transition font-semibold"
                >
                  Delete Task
                </button>

              </div>

              {/* Comments Section */}
              <div className="mt-10 border-t border-white/10 pt-8">

                <h4 className="text-2xl font-bold text-white mb-6">
                  Collaboration
                </h4>

                <CommentForm
                  taskId={task.id}
                />

                <CommentList
                  taskId={task.id}
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};