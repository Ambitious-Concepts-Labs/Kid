import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../screens/Static/NotFound"

const PrivateRoute = ({ type, element: Component, user, currentUser }) => {
  const isLoggedIn = user ? true : false;
  const isAdmin = currentUser?.isAdmin;

  if (type === "login") {
    return isLoggedIn ? Component : <Navigate to="/" />;
  }

  if (type === "admin") {
    return isAdmin ? Component : <NotFound
        code={402}
        link={"/dashboard"}
        msg={"Oops, looks you are not authorized to view this page! If this is by mistake please contact your admin."}
      />;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute;
