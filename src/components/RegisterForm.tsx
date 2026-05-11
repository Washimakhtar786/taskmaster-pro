import React from "react";

import { useForm } from "react-hook-form";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

interface RegisterFormInputs {
  email: string;
  password: string;
}

export const RegisterForm: React.FC =
  () => {
    const { register: registerUser } =
      useAuth();

    const navigate =
      useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormInputs>();

    const onSubmit = async (
      data: RegisterFormInputs
    ) => {
      try {
        await registerUser(
          data.email,
          data.password
        );

        navigate("/dashboard");
      } catch (error) {
        alert(
          "Registration failed: " +
            (error as Error)
              .message
        );
      }
    };

    return (
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-6"
      >

        {/* Email */}
        <div>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required:
                "Email is required",
            })}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 outline-none focus:border-green-400"
          />

          {errors.email && (
            <p className="text-red-400 text-sm mt-2">
              {
                errors.email
                  .message
              }
            </p>
          )}

        </div>

        {/* Password */}
        <div>

          <input
            type="password"
            placeholder="Create password"
            {...register(
              "password",
              {
                required:
                  "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Minimum 6 characters",
                },
              }
            )}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 outline-none focus:border-green-400"
          />

          {errors.password && (
            <p className="text-red-400 text-sm mt-2">
              {
                errors.password
                  .message
              }
            </p>
          )}

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-400 text-black font-bold py-4 rounded-xl hover:bg-green-300 transition"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-gray-300 text-center">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-green-400 hover:underline"
          >
            Login
          </Link>

        </p>

      </form>
    );
  };