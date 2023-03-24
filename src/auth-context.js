import React, { useState, useEffect } from "react";

const authContext = React.createContext({
  loggedInUser: null,
  token: "",
  isLoggedIn: false,
  userLogin: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  let [token, setToken] = useState(() => {
    const tkn = localStorage.getItem("token");
    return tkn !== "null" ? tkn : null;
  });
  let [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user !== "null" ? user : null;
  });
  let isUserLoggedIn = token ? true : false;

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    isUserLoggedIn = token ? true : false;
  }, [token]);

  const loginHandler = (emp) => {
    setUser(JSON.stringify(emp));
    setToken(emp?.emp_id);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  const contextValue = {
    loggedInUser: JSON.parse(user),
    token: token,
    isLoggedIn: isUserLoggedIn,
    userLogin: loginHandler,
    logout: logoutHandler,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export default authContext;
