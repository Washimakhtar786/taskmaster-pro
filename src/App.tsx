import { Routes, Route } from "react-router-dom";


import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";

import { PrivateRoute } from "./routes/PrivateRoute";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
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



    </Routes>
  );
}

export default App;