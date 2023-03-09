import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import authContext from "./auth-context";
import Login from "./views/auth/login/login";
import Dashboard from "./views/app/dashboard/dashboard";

function App() {
  const { token, userLogin, logout, isLoggedIn } = useContext(authContext);

  return (
    <div className="App">
      <Routes>
        {!token && (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        {token && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
