import { useState } from 'react';

export const useLoginForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    userType: 'employee' 
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const setUserType = (type) => {
    setValues({
      ...values,
      userType: type
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    handleSubmit,
    setUserType
  };
};