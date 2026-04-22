import { useState } from 'react';
import { registerEmployee, registerSchool } from '../api/services/projectServices';


export const useEmployeeRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (employeeData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await registerEmployee(employeeData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

   const schoolregister = async (schoolData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await registerSchool(schoolData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return {
    register,
    schoolregister,
    isLoading,
    error,
    success,
    reset: () => {
      setError(null);
      setSuccess(false);
    }
  };
};