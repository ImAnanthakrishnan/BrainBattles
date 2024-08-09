import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PublicRoute = () => {
  const { currentUser } = useAppSelector((data) => data.user);
  return !currentUser ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoute;
