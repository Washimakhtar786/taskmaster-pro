import { Routes, Route } from "react-router-dom";


import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
import { HomePage } from "./pages/HomePage";

import { PrivateRoute } from "./routes/PrivateRoute";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";

function App() {
  return (


    


    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />


      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
/>

      <Route
        path="/projects"
        element={
         <PrivateRoute>
            <ProjectsPage />
         </PrivateRoute>
      }
  />

  <Route
  path="/projects/:projectId"
  element={
    <PrivateRoute>
      <ProjectDetailsPage />
    </PrivateRoute>
  }
/>



    </Routes>
  );
}

export default App;