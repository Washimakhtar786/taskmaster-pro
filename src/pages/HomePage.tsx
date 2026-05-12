import React from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export const HomePage: React.FC =
  () => {
    return (
      <div className="min-h-screen bg-[#071B2A] text-white overflow-hidden relative">

        {/* Background Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-400/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"></div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">

          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

            <h1 className="text-3xl font-extrabold text-green-400 tracking-wide">
              TaskMaster Pro
            </h1>

            <ul className="hidden md:flex items-center gap-10 font-medium text-white">

              <li className="hover:text-green-400 transition cursor-pointer">
                Home
              </li>

              <li className="hover:text-green-400 transition cursor-pointer">
                Features
              </li>

              <li className="hover:text-green-400 transition cursor-pointer">
                Pricing
              </li>

              <li className="hover:text-green-400 transition cursor-pointer">
                Contact
              </li>

            </ul>

            <div className="flex items-center gap-4">

              <Link
                to="/login"
                className="text-white hover:text-green-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-400 text-black px-5 py-2 rounded-xl font-bold hover:bg-green-300 transition shadow-lg shadow-green-400/20"
              >
                Get Started
              </Link>

            </div>

          </div>

        </nav>

        {/* Hero Section */}
        <section className="pt-40 flex flex-col items-center justify-center text-center px-6 py-32 relative z-10">

          {/* Floating Gradients */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute top-20 left-20 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
            className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
          />

          {/* Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl"
          >

            Manage Projects
            <span className="text-green-400">
              {" "}Smarter
            </span>

          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            className="mt-8 text-lg text-gray-300 max-w-2xl leading-8"
          >

            TaskMaster Pro helps teams manage projects,
            collaborate in real-time, and deliver work faster
            with a modern productivity workflow.

          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
            className="mt-10 flex flex-col sm:flex-row gap-5"
          >

            <Link
              to="/register"
              className="bg-green-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-green-300 transition shadow-2xl shadow-green-400/40"
            >
              Get Started
            </Link>

            <button className="border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">
              Live Demo
            </button>

          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.9,
            }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
          >

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg"
            >

              <h2 className="text-4xl font-bold text-green-400">
                10K+
              </h2>

              <p className="text-gray-300 mt-2">
                Active Users
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg"
            >

              <h2 className="text-4xl font-bold text-green-400">
                50K+
              </h2>

              <p className="text-gray-300 mt-2">
                Projects Managed
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg"
            >

              <h2 className="text-4xl font-bold text-green-400">
                99.9%
              </h2>

              <p className="text-gray-300 mt-2">
                Uptime Reliability
              </p>

            </motion.div>

          </motion.div>

        </section>

      </div>
    );
  };