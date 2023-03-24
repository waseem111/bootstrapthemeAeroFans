import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import authContext from "./auth-context";
import Login from "./views/auth/login/login";
import Dashboard from "./views/app/dashboard/dashboard";
import Fansdata from "./views/app/fansdata/fansdata"
import Company from "./views/app/companies/company/company";
import EditCompany from "./views/app/companies/editcompany/editcompany";
import AddCompany from "./views/app/companies/addcompany/addcompany";
import Employees from "./views/app/employees/employees/employees";
import AddEmployee from "./views/app/employees/addemployee/addemployee";
import EditEmployee from "./views/app/employees/editemployee/editemployee";
import Addunits from "./views/app/projects/addunits/addunits";
import Units from "./views/app/projects/units/units";
import Addproject from "./views/app/projects/addprojects/addprojects";
import Fans from "./views/app/lookups/fans/fans";
import Unitconversions from "./views/app/lookups/unitconversions/unitconversions";
import Roleprivileges from "./views/app/lookups/roleprivileges/roleprivileges";
//import Addproject from "./views/app/projects/projects/Projects";
import Projects from "./views/app/projects/projects/projects";
import Createquotation from "./views/app/quotations/createquotation/createquotation";
import Quotations from "./views/app/quotations/quotations/quotations";
import AddBranch from "./views/app/companies/addbranch/addbranch";
import Branches from "./views/app/companies/branches/branches";
import EditBranch from "./views/app/companies/editbranch/editbranch";

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

            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/editemployee/:id" element={<EditEmployee />} />
            <Route path="/employees" element={<Employees />} />

            <Route path="/addcompany" element={<AddCompany />} />
            <Route path="/editcompany/:id" element={<EditCompany />} />
            <Route path="/companies" element={<Company />} />

            <Route path="/addbranch" element={<AddBranch />} />
            <Route path="/editbranch/:id" element={<EditBranch />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/branches/:id" element={<Branches />} />

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
