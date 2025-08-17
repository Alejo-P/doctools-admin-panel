import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthProvider';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
