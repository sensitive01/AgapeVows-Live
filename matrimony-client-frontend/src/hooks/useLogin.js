
import { useState } from 'react';
import { loginEmployee, loginSchool } from '../api/services/projectServices';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (loginData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Clear any existing data before new login
      localStorage.removeItem('authToken');
      localStorage.removeItem('employerToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userType');

      let response;
      if (loginData.userType === 'employee') {
        response = await loginEmployee({
          userEmail: loginData.email,
          userPassword: loginData.password
        });
      } else {
        response = await loginSchool({
          userEmail: loginData.email,
          userPassword: loginData.password
        });
      }

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(response.user));
      localStorage.setItem('userType', loginData.userType);

      // Check for stored redirect path
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      } else {
        if (loginData.userType === 'employee') {
          navigate('/dashboard');
        } else {
          navigate('/employer/new-candidate');
        }
      }
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    resetError: () => setError(null)
  };
};