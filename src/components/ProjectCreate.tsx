import React from "react";

import { useForm } from "react-hook-form";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useAuth } from "../contexts/AuthContext";

interface ProjectForm {
  name: string;
  description?: string;
}

export const ProjectCreate: React.FC =
  () => {
    const { user } = useAuth();

    const {
      register,
      handleSubmit,
      reset,
    } = useForm<ProjectForm>();

    const onSubmit = async (
      data: ProjectForm
    ) => {
      if (!user) return;

      try {
        await addDoc(
          collection(db, "projects"),
          {
            ...data,
            ownerId: user.uid,
            createdAt:
              serverTimestamp(),
            updatedAt:
              serverTimestamp(),
          }
        );

        reset();

        alert(
          "Project created successfully"
        );
      } catch (error) {
        alert(
          "Failed to create project: " +
            (error as Error)
              .message
        );
      }
    };

    return (
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        <input
          {...register("name", {
            required:
              "Project name is required",
          })}
          placeholder="Project Name"
        />

        <textarea
          {...register(
            "description"
          )}
          placeholder="Description (optional)"
        />

        <button type="submit">
          Create Project
        </button>
      </form>
    );
  };