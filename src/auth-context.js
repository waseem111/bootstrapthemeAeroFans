import React, { useState, useEffect } from "react";

const authContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userLogin: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  debugger;
  let [token, setToken] = useState(() => {
    const tkn = localStorage.getItem("token");
    return tkn !== "null" ? tkn : null;
  });
  let isUserLoggedIn = token ? true : false;

  useEffect(() => {
    localStorage.setItem("token", token);
    isUserLoggedIn = token ? true : false;
  }, [token]);

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setToken(null);
  };

  const contextValue = {
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
