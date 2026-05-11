import React from "react";

import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage: React.FC =
  () => {
    return (
      <div className="min-h-screen bg-[#071B2A] flex items-center justify-center px-6">

        {/* Background Glow */}
        <div className="absolute w-96 h-96 bg-green-400/20 blur-3xl rounded-full top-20 left-20"></div>

        <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full bottom-20 right-20"></div>

        {/* Register Card */}
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">

          <h1 className="text-4xl font-bold text-white text-center">
            Create Account
          </h1>

          <p className="text-gray-300 text-center mt-3">
            Start managing your projects smarter
          </p>

          <div className="mt-10">
            <RegisterForm />
          </div>

        </div>

      </div>
    );
  };