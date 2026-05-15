import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useAuth } from "./AuthContext";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: any;
}

interface NotificationContextType {
  notifications: Notification[];

  markAsRead: (
    id: string
  ) => Promise<void>;
}

const NotificationContext =
  createContext<
    NotificationContextType | undefined
  >(undefined);

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();

  const [
    notifications,
    setNotifications,
  ] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const q = query(
      collection(
        db,
        "notifications"
      ),

      where(
        "userId",
        "==",
        user.uid
      ),

      orderBy(
        "createdAt",
        "desc"
      )
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {
          const notifs =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<
                  Notification,
                  "id"
                >),
              })
            );

          setNotifications(
            notifs
          );
        }
      );

    return () => unsubscribe();
  }, [user]);

  const markAsRead =
    async (id: string) => {
      const notifRef = doc(
        db,
        "notifications",
        id
      );

      await updateDoc(
        notifRef,
        {
          read: true,
        }
      );
    };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications =
  () => {
    const context =
      useContext(
        NotificationContext
      );

    if (!context) {
      throw new Error(
        "useNotifications must be used within NotificationProvider"
      );
    }

    return context;
  };