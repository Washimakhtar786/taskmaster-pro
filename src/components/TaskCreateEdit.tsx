import React, {
  useEffect,
} from "react";

import { useForm } from "react-hook-form";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useAuth } from "../contexts/AuthContext";

interface TaskForm {
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
  dueDate: string;
}

interface Props {
  projectId: string;
  taskId?: string;
  existingData?: TaskForm;
  onComplete?: () => void;
}

export const TaskCreateEdit: React.FC<
  Props
> = ({
  projectId,
  taskId,
  existingData,
  onComplete,
}) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<TaskForm>({
    defaultValues:
      existingData || {
        title: "",
        description: "",
        assignedTo: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
      },
  });

  useEffect(() => {
    if (existingData) {
      for (const [
        key,
        value,
      ] of Object.entries(
        existingData
      )) {
        setValue(
          key as keyof TaskForm,
          value as never
        );
      }
    }
  }, [existingData, setValue]);

  const onSubmit = async (
    data: TaskForm
  ) => {
    if (!user) return;

    try {
      if (taskId) {
        const taskRef = doc(
          db,
          "tasks",
          taskId
        );

        await updateDoc(taskRef, {
          ...data,
          updatedAt:
            serverTimestamp(),
        });
      } else {
        await addDoc(
          collection(db, "tasks"),
          {
            ...data,
            projectId,
            createdAt:
              serverTimestamp(),
            updatedAt:
              serverTimestamp(),
          }
        );
      }

      reset();

      if (onComplete) {
        onComplete();
      }

      alert(
        `Task ${
          taskId
            ? "updated"
            : "created"
        } successfully`
      );

    } catch (error) {
      alert(
        "Failed to save task: " +
          (error as Error).message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-lg"
    >

      {/* Task Title */}
      <div>

        <label className="block text-sm text-gray-400 mb-2">
          Task Title
        </label>

        <input
          {...register("title", {
            required: true,
          })}
          placeholder="Enter task title"
          className="w-full bg-[#243746] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-400 transition"
        />

      </div>

      {/* Description */}
      <div>

        <label className="block text-sm text-gray-400 mb-2">
          Description
        </label>

        <textarea
          {...register(
            "description"
          )}
          placeholder="Enter task description"
          className="w-full bg-[#243746] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-400 transition h-32 resize-none"
        />

      </div>

      {/* Assigned To */}
      <div>

        <label className="block text-sm text-gray-400 mb-2">
          Assign To
        </label>

        <input
          {...register(
            "assignedTo",
            {
              required: true,
            }
          )}
          placeholder="Enter user ID"
          className="w-full bg-[#243746] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-400 transition"
        />

      </div>

      {/* Status */}
      <div>

        <label className="block text-sm text-gray-400 mb-2">
          Task Status
        </label>

        <select
          {...register("status")}
          className="w-full bg-[#243746] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-400 transition"
        >

          <option
            value="pending"
            className="bg-[#243746] text-white"
          >
            Pending
          </option>

          <option
            value="in-progress"
            className="bg-[#243746] text-white"
          >
            In Progress
          </option>

          <option
            value="completed"
            className="bg-[#243746] text-white"
          >
            Completed
          </option>

        </select>

      </div>

      {/* Priority */}
      <div>

        <label className="block text-sm text-gray-400 mb-2">
          Priority
        </label>

        <select
          {...register("priority")}
          className="w-full bg-[#243746] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-400 transition"
        >

          <option
            value="low"
            className="bg-[#243746] text-white"
          >
            Low
          </option>

          <option
            value="medium"
            className="bg-[#243746] text-white"
          >
            Medium
          </option>

          <option
            value="high"
            className="bg-[#243746] text-white"
          >
            High
          </option>

        </select>

      </div>

      {/* Due Date */}
      <div>

        <label className="block text-sm text-gray-400 mb-2">
          Due Date
        </label>

        <input
          type="date"
          {...register("dueDate")}
          className="w-full bg-[#243746] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-400 transition"
        />

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-400 text-black py-4 rounded-2xl font-bold hover:bg-green-300 hover:scale-[1.01] transition-all duration-300"
      >
        {taskId
          ? "Update Task"
          : "Create Task"}
      </button>

    </form>
  );
};