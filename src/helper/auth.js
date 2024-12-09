// auth.js

import { encryptAndStoreLoc } from "./localStorage";

export const login = (user) => {
  if (user?.token) {
    localStorage.setItem("token", user?.token);
  }
  // encryptAndStoreLoc("data", user);
};


export const logout = () => {
  localStorage.clear()
  // window.location.href = "/login";
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
