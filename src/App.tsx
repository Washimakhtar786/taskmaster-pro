import { Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { HomePage } from "./pages/HomePage";

import { PrivateRoute } from "./routes/PrivateRoute";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Register */}
      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* Unauthorized */}
      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      {/* Projects */}
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <ProjectsPage />
          </PrivateRoute>
        }
      />

      {/* Single Project Workspace */}
      <Route
        path="/projects/:projectId"
        element={
          <PrivateRoute>
            <ProjectDetailPage />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;