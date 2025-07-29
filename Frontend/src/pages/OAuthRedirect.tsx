import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

type DecodedToken = {
  userId: string;
  email: string;
  name?: string;
  iat: number;
  exp: number;
};

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      const decoded = jwtDecode<DecodedToken>(token);

      login({ name: decoded.name || 'Google User', email: decoded.email });
      navigate('/dashboard');
    } else {
      setTimeout(() => navigate('/signin'), 1000);
    }
  }, [navigate, login]);

  return (
    <div className="text-center mt-10 text-lg">
      Logging you in via Google...
    </div>
  );
};

export default OAuthRedirect;
