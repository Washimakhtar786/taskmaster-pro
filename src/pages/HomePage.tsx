import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC =
  () => {
    return (
      <div className="min-h-screen bg-[#071B2A] text-white">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">

          <h1 className="text-3xl font-bold text-green-400">
            TaskMaster Pro
          </h1>

          <ul className="hidden md:flex items-center gap-8 font-medium">

            <li className="hover:text-green-400 cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-green-400 cursor-pointer transition">
              Features
            </li>

            <li className="hover:text-green-400 cursor-pointer transition">
              Pricing
            </li>

            <li className="hover:text-green-400 cursor-pointer transition">
              Contact
            </li>

          </ul>

          <Link
             to="/login"
             className="bg-green-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-green-300 transition"
          >
             Login
             </Link>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-32">

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl">

            Manage Projects
            <span className="text-green-400">
              {" "}Smarter
            </span>

          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-2xl leading-8">

            TaskMaster Pro helps teams manage projects,
            collaborate in real-time, and deliver work faster
            with a modern productivity workflow.

          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/register"
              className="bg-green-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-green-300 transition"
            >
                Get Started
            </Link>

            <button className="border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">
              Live Demo
            </button>

          </div>

        </section>

      </div>
    );
  };