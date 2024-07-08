import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element: Component, ...rest }:{element:any}) => {
  const token = Cookies.get("token"); // Change 'token' to the name of your token cookie

  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
