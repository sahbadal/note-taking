import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  // const { user } = useAuth();
  const user = { name: 'John Doe' }; // Mock user
  return user ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;