import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const authToken = localStorage.getItem('accessToken');
  const isAuthenticated = authToken ? true : false;
  console.log(authToken)

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoutes;
