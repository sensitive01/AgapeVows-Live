// hooks/useRegistrationForm.js
import { useState } from 'react';

export const useEmployerRegstForm = (callback, validate) => {
  const [values, setValues] = useState({
    schoolName: '',
    firstName: '',
    lastName: '',
    userEmail: '',
    userMobile: '',
    userPassword: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    institutionType: '',
    board: '',
    website: '',
    employerType: 'School' // Default value
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
        callback(values);
      }
    } else {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit
  };
};