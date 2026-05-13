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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg hover:border-green-400/30 transition"
            >

              {/* Top */}
              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-bold text-white">
                  {task.title}
                </h3>

                <span className="bg-green-400/20 text-green-400 px-4 py-2 rounded-xl text-sm font-semibold capitalize">
                  {task.priority}
                </span>

              </div>

              {/* Description */}
              <p className="text-gray-400 mt-5 leading-7">
                {task.description ||
                  "No description"}
              </p>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-6 mt-8">

                <div>

                  <p className="text-sm text-gray-400">
                    Status
                  </p>

                  <p className="font-semibold mt-2 capitalize text-white">
                    {task.status}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-400">
                    Due Date
                  </p>

                  <p className="font-semibold mt-2 text-white">
                    {task.dueDate ||
                      "N/A"}
                  </p>

                </div>

              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8">

                <div className="text-sm text-gray-400">
                  Assigned:
                  <span className="text-white ml-2">
                    {task.assignedTo}
                  </span>
                </div>

                <button
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                  className="bg-red-500/20 text-red-400 px-5 py-2 rounded-xl hover:bg-red-500/30 transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};