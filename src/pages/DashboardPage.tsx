import React from "react";

import { Sidebar } from "../components/Sidebar";

import { useAuth } from "../contexts/AuthContext";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../api/firebase";

import { useNavigate } from "react-router-dom";

export const DashboardPage: React.FC =
  () => {
    const { user } = useAuth();

    const navigate =
      useNavigate();

    const createProject =
      async () => {
        if (!user) {
          alert(
            "User not logged in"
          );
          return;
        }

        try {
          const docRef =
            await addDoc(
              collection(
                db,
                "projects"
              ),
              {
                name:
                  "New Project",
                description:
                  "Project description",
                ownerId:
                  user.uid,
                createdAt:
                  serverTimestamp(),
              }
            );

          console.log(
            "Project Created:",
            docRef.id
          );

          navigate(
            `/projects/${docRef.id}`
          );

        } catch (error) {
          console.log(error);

          alert(
            "Failed to create project"
          );
        }
      };

    return (
      <div className="flex min-h-screen bg-[#071B2A] text-white">

        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <main className="flex-1 p-10">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold">
                Dashboard
              </h1>

              <p className="text-gray-400 mt-2">
                Welcome back,
                {" "}
                {user?.email}
              </p>

            </div>

            {/* WORKING BUTTON */}
            <button
              onClick={
                createProject
              }
              className="bg-green-400 text-black px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition"
            >
              Create Project
            </button>

          </div>

          {/* Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

              <h2 className="text-gray-400">
                Total Projects
              </h2>

              <p className="text-5xl font-bold mt-4 text-green-400">
                24
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

              <h2 className="text-gray-400">
                Active Tasks
              </h2>

              <p className="text-5xl font-bold mt-4 text-green-400">
                128
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

              <h2 className="text-gray-400">
                Team Members
              </h2>

              <p className="text-5xl font-bold mt-4 text-green-400">
                12
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  };