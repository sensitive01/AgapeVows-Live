export const validationsEmployeer = (values) => {
  const errors = {};
  
  if (!values.schoolName.trim()) {
    errors.schoolName = 'Full name is required';
  }
  
  if (!values.userEmail) {
    errors.userEmail = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.userEmail)) {
    errors.userEmail = 'Email is invalid';
  }
  
  if (!values.userMobile) {
    errors.userMobile = 'Phone number is required';
  } else if (!/^\d{10,15}$/.test(values.userMobile)) {
    errors.userMobile = 'Phone number is invalid';
  }
  
  if (!values.userPassword) {
    errors.userPassword = 'Password is required';
  }
  
  if (values.userPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

    if (!values.sendEmails) {
    errors.sendEmails = 'This option is required';
  }
  
  if (!values.agreeTerms) {
    errors.agreeTerms = 'You must agree to the terms and conditions';
  }
  
  
  return errors;
};