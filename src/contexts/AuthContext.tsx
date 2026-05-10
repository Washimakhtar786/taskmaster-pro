import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../api/firebase";

import type { AppUser } from "../types/user";

interface AuthContextType {
  user: AppUser | null;

  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<AppUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          if (firebaseUser) {
            const userDoc =
              await getDoc(
                doc(
                  db,
                  "users",
                  firebaseUser.uid
                )
              );

            if (userDoc.exists()) {
              setUser({
                ...firebaseUser,
                role:
                  userDoc.data().role,
              } as AppUser);
            } else {
              setUser(
                firebaseUser as AppUser
              );
            }
          } else {
            setUser(null);
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string
  ) => {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const register = async (
    email: string,
    password: string
  ) => {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        role: "member",
        createdAt: new Date(),
      }
    );
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};