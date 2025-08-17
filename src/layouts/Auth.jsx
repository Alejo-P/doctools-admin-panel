import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthProvider';

const Auth = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to="/dashboard/" /> : <Outlet />;
};

export default Auth;
