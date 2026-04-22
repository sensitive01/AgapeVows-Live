import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useLoginCleanup = () => {
  const location = useLocation();

  useEffect(() => {
    const loginRoutes = [
      '/login',
      '/employer/login',
      '/employee-registration'
    ];

    if (loginRoutes.includes(location.pathname)) {
      // Clear all authentication-related data
      localStorage.removeItem('authToken');
      localStorage.removeItem('employerToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userType');
    }
  }, [location.pathname]);
};