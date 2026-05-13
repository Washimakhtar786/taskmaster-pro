import React, {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../api/firebase";

interface Comment {
  id: string;
  userId: string;
  text: string;
}

interface Props {
  taskId: string;
}

export const CommentList: React.FC<
  Props
> = ({ taskId }) => {
  const [comments, setComments] =
    useState<Comment[]>([]);

  useEffect(() => {
    const q = query(
      collection(
        db,
        "tasks",
        taskId,
        "comments"
      )
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {
          const commentsData =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<
                  Comment,
                  "id"
                >),
              })
            );

          setComments(
            commentsData
          );
        }
      );

    return () => unsubscribe();
  }, [taskId]);

  return (
    <div className="mt-8">

      <h3 className="text-2xl font-bold mb-6">
        Comments
      </h3>

      {comments.length === 0 ? (

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-400">
          No comments yet.
        </div>

      ) : (

        <div className="space-y-5">

          {comments.map(
            (comment) => (

              <div
                key={comment.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >

                <div className="flex items-center justify-between mb-3">

                  <p className="text-green-400 font-semibold">
                    {
                      comment.userId
                    }
                  </p>

                </div>

                <p className="text-gray-300 leading-7">
                  {comment.text}
                </p>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
};