// import { useState } from 'react';

// export const useRegistrationForm = (callback, validate) => {
//   const [values, setValues] = useState({
//     userName: '',
//     userMobile: '',
//     userEmail: '',
//     userPassword: '',
//     confirmPassword: ''
//   });
  
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({
//       ...values,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Run validation if provided
//     if (validate) {
//       const validationErrors = validate(values);
//       setErrors(validationErrors);
      
//       if (Object.keys(validationErrors).length === 0) {
//         callback(values);
//       }
//     } else {
//       callback(values);
//     }
//   };

//   return {
//     values,
//     errors,
//     handleChange,
//     handleSubmit
//   };
// };

// useRegistrationForm.js
import { useState } from 'react';

export const useRegistrationForm = (callback, validate) => {
  const [values, setValues] = useState({
    userName: '',
    userMobile: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null); // Add this line for API errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    setApiError(null);

    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    try {
      await callback(values);
    } catch (err) {
      // Handle API errors here
      const errorData = err.response?.data;
      const errorMessage = errorData?.message || 'Registration failed';
      
      // Handle duplicate email/mobile errors
      if (errorData?.errors) {
        const newErrors = {};
        
        errorData.errors.forEach(error => {
          if (error.path === 'userEmail') {
            newErrors.userEmail = 'Email is already registered';
          } else if (error.path === 'userMobile') {
            newErrors.userMobile = 'Mobile number is already registered';
          }
        });

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          setApiError('Registration failed: ' + Object.values(newErrors).join(', '));
        } else {
          setApiError(errorMessage);
        }
      } else {
        setApiError(errorMessage);
      }
    }
  };

  return {
    values,
    errors,
    apiError, // Make sure to expose apiError
    handleChange,
    handleSubmit
  };
};