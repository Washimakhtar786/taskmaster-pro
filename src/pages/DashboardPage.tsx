import React from "react";
import { Navbar } from "../components/Navbar";

import { useAuth } from "../contexts/AuthContext";

export const DashboardPage: React.FC =
  () => {
    const { user, logout } =
      useAuth();

    return (

      <div>

        <Navbar />
        <h1>Dashboard</h1>

        <p>
          Welcome:
          {user?.email}
        </p>

        <p>
          Role:
          {user?.role}
        </p>

        {user?.role === "admin" ? (
          <div>
            <h2>Admin Panel</h2>

            <p>
              Manage users and reports
            </p>
          </div>
        ) : (
          <div>
            <h2>Member Panel</h2>

            <p>
              View your projects and
              tasks
            </p>
          </div>
        )}

        <button onClick={logout}>
          Logout
        </button>
      </div>
    );
  };