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

            <Route path="/addemployee" element={<Dashboard />} />
            <Route path="/employees" element={<Dashboard />} />

            <Route path="/addcustomer" element={<Dashboard />} />
            <Route path="/customers" element={<Dashboard />} />

            <Route path="/addproject" element={<Dashboard />} />
            <Route path="/projects" element={<Dashboard />} />
            <Route path="/addunit" element={<Dashboard />} />
            <Route path="/units" element={<Dashboard />} />
            
            <Route path="/createquotation" element={<Dashboard />} />
            <Route path="/quotations" element={<Dashboard />} />

            <Route path="/fandata" element={<Dashboard />} />

            <Route path="/fans" element={<Dashboard />} />
            <Route path="/unitconversions" element={<Dashboard />} />
            <Route path="/roleprivileges" element={<Dashboard />} />
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
