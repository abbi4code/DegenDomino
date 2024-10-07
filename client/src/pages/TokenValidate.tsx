import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }:{element:any}) => {
  const token = localStorage.getItem("usertoken")

  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
