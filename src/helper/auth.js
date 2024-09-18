// auth.js

import { encryptAndStoreLoc } from "./localStorage";

export const login = (user) => {
  if (user?.token) {
    localStorage.setItem("token", user?.token);
  }
  encryptAndStoreLoc("name", user?.name);
  encryptAndStoreLoc("user", user?.id);
  encryptAndStoreLoc("email", user?.email);
  encryptAndStoreLoc("username", user?.username);
  encryptAndStoreLoc("profile_image", user?.profile_image);



};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("profile_image");
  // window.location.href = "/login";
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
