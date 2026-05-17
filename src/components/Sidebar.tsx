import React from "react";

import { Link } from "react-router-dom";

export const Sidebar: React.FC =
  () => {

    return (

      <>

        {/* Mobile Topbar */}
        <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#081420] border-b border-white/10 px-5 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-extrabold text-green-400">
            TaskMaster
          </h1>

          <Link
            to="/projects"
            className="bg-green-400 text-black px-4 py-2 rounded-xl font-semibold text-sm"
          >
            Projects
          </Link>

        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-72 min-h-screen bg-[#081420] border-r border-white/10 p-8 flex-col">

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

            </ul>

          </nav>

        </aside>

      </>

    );

  };