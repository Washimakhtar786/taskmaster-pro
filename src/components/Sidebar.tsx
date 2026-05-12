import React from "react";

import { Link } from "react-router-dom";

export const Sidebar: React.FC =
  () => {
    return (
      <aside className="w-72 min-h-screen bg-[#081420] border-r border-white/10 p-8">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-green-400">
          TaskMaster
        </h1>

        {/* Navigation */}
        <nav className="mt-12">

          <ul className="space-y-4">

            <li>
              <Link
                to="/dashboard"
                className="block bg-green-400 text-black px-5 py-3 rounded-xl font-semibold"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/projects"
                className="block hover:bg-white/10 px-5 py-3 rounded-xl transition"
              >
                Projects
              </Link>
            </li>

            <li>
              <button
                className="w-full text-left hover:bg-white/10 px-5 py-3 rounded-xl transition"
              >
                Teams
              </button>
            </li>

            <li>
              <button
                className="w-full text-left hover:bg-white/10 px-5 py-3 rounded-xl transition"
              >
                Analytics
              </button>
            </li>

            <li>
              <button
                className="w-full text-left hover:bg-white/10 px-5 py-3 rounded-xl transition"
              >
                Settings
              </button>
            </li>

          </ul>

        </nav>

      </aside>
    );
  };