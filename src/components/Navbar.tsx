import React from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export const Navbar: React.FC =
  () => {
    const { user, logout } =
      useAuth();

    return (
      <nav>
        <ul
          style={{
            display: "flex",
            gap: "20px",
            listStyle: "none",
          }}
        >
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/projects">
              Projects
            </Link>
          </li>

          <li>
            <button
              onClick={logout}
            >
              Logout
            </button>
          </li>

          <li>
            {user?.email}
          </li>
        </ul>
      </nav>
    );
  };