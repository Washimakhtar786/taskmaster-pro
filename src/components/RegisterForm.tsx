import React from "react";

import { useForm } from "react-hook-form";

import { useAuth } from "../contexts/AuthContext";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const { register: registerUser } =
    useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (
    data: RegisterFormInputs
  ) => {
    if (
      data.password !==
      data.confirmPassword
    ) {
      alert("Passwords do not match");

      return;
    }

    try {
      await registerUser(
        data.email,
        data.password
      );

      alert(
        "Account created successfully"
      );

      reset();
    } catch (error) {
      alert(
        "Registration failed: " +
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

      <div>
        <label>Confirm Password</label>

        <input
          type="password"
          placeholder="Confirm password"
          {...register(
            "confirmPassword"
          )}
        />
      </div>

      <button type="submit">
        Register
      </button>
    </form>
  );
};