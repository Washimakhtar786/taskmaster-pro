import React from "react";

import { useForm } from "react-hook-form";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useAuth } from "../contexts/AuthContext";

interface CommentFormInputs {
  text: string;
}

interface Props {
  taskId: string;
}

export const CommentForm: React.FC<
  Props
> = ({ taskId }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CommentFormInputs>();

  const onSubmit = async (
    data: CommentFormInputs
  ) => {
    if (!user) return;

    try {
      await addDoc(
        collection(
          db,
          "tasks",
          taskId,
          "comments"
        ),
        {
          userId: user.uid,
          text: data.text,
          createdAt:
            serverTimestamp(),
        }
      );

      reset();

    } catch (error) {
      alert(
        "Failed to add comment: " +
          (error as Error).message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >

      <textarea
        {...register("text", {
          required:
            "Comment cannot be empty",
        })}
        placeholder="Write a comment..."
        className="w-full bg-[#243746] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none h-28 resize-none"
      />

      <button
        type="submit"
        className="bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300 transition"
      >
        Add Comment
      </button>

    </form>
  );
};