import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import authContext from "./auth-context";
import Login from "./views/auth/login/login";
import Dashboard from "./views/app/dashboard/dashboard";
import Fansdata from "./views/app/fansdata/fansdata"
import Addcustomer from "./views/app/customers/addcustomer/addcustomer";
import Customers from "./views/app/customers/customers/customers";
import Employees from "./views/app/employees/employees/employees/employees";
import Addemployees from "./views/app/employees/employees/addemployee/addemployee";
import Addunits from "./views/app/projects/addunits/addunits";
import Units from "./views/app/projects/units/units";
import Addproject from "./views/app/projects/projects/Projects";
import Fans from "./views/app/lookups/fans/fans";
import Unitconversions from "./views/app/lookups/unitconversions/unitconversions";
import Roleprivileges from "./views/app/lookups/roleprivileges/roleprivileges";
import Addprojects from "./views/app/projects/projects/Projects";
import Projects from "./views/app/projects/projects/Projects";
import Createquotation from "./views/app/quotations/createquotation/createquotation";
import Quotations from "./views/app/quotations/quotations/quotations";
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

            <Route path="/addemployee" element={<Addemployees />} />
            <Route path="/employees" element={<Employees />} />

            <Route path="/addcustomer" element={<Addcustomer />} />
            <Route path="/customers" element={<Customers />} />

            <Route path="/addproject" element={<Addproject />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/addunit" element={<Addunits />} />
            <Route path="/units" element={<Units />} />
            
            <Route path="/createquotation" element={<Createquotation />} />
            <Route path="/quotations" element={<Quotations />} />

            <Route path="/fansdata" element={<Fansdata />} />

            <Route path="/fans" element={<Fans />} />
            <Route path="/unitconversions" element={<Unitconversions />} />
            <Route path="/roleprivileges" element={<Roleprivileges />} />
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
