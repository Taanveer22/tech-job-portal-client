import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/signin" state={location?.pathname}></Navigate>;
};

export default PrivateRoutes;
