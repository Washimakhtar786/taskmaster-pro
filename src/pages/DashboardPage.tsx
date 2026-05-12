import React from "react";

import { Sidebar } from "../components/Sidebar";

import { useAuth } from "../contexts/AuthContext";

export const DashboardPage: React.FC =
  () => {
    const { user } = useAuth();

    return (
      <div className="flex min-h-screen bg-[#071B2A] text-white">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
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

            <button className="bg-green-400 text-black px-5 py-3 rounded-xl font-bold hover:bg-green-300 transition">
              Create Project
            </button>

          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">

              <h2 className="text-gray-400">
                Total Projects
              </h2>

              <p className="text-5xl font-bold mt-4 text-green-400">
                24
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">

              <h2 className="text-gray-400">
                Active Tasks
              </h2>

              <p className="text-5xl font-bold mt-4 text-green-400">
                128
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">

              <h2 className="text-gray-400">
                Team Members
              </h2>

              <p className="text-5xl font-bold mt-4 text-green-400">
                12
              </p>

            </div>

          </div>

          {/* Recent Projects */}
          <div className="mt-14">

            <h2 className="text-2xl font-bold">
              Recent Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

                <h3 className="text-xl font-bold">
                  AI Task Manager
                </h3>

                <p className="text-gray-400 mt-3">
                  Build enterprise AI workflow system.
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

                <h3 className="text-xl font-bold">
                  SaaS CRM Platform
                </h3>

                <p className="text-gray-400 mt-3">
                  Customer management and analytics dashboard.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>
    );
  };