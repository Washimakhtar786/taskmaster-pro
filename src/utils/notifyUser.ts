import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";

export const notifyUser =
  async (
    userId: string,
    message: string
  ) => {

    try {

      await addDoc(
        collection(
          db,
          "notifications"
        ),
        {
          userId,
          message,
          read: false,
          createdAt:
            serverTimestamp(),
        }
      );

    } catch (error) {

      console.log(
        "Notification Error:",
        error
      );

    }
  };