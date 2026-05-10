import React from "react";

import { useForm } from "react-hook-form";

import { useAuth } from "../contexts/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<LoginFormInputs>();

  const onSubmit = async (
    data: LoginFormInputs
  ) => {
    try {
      await login(
        data.email,
        data.password
      );

      alert("Logged in successfully");

      reset();
    } catch (error) {
      alert(
        "Login failed: " +
          (error as Error).message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label>Email</label>

        <input
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
      </div>

      <div>
        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          {...register("password")}
        />
      </div>

      <button type="submit">
        Login
      </button>
    </form>
  );
};