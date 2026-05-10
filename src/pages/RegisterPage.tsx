import React from "react";

import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage: React.FC =
  () => {
    return (
      <div>
        <h1>Register Page</h1>

        <RegisterForm />
      </div>
    );
  };