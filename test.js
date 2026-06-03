const axios = require('axios');

async function test() {
  try {
    const formData = {
      name: "Test User",
      email: "test_new123@example.com",
      phone: "919876543210",
      password: "password123",
      agree: true
    };
    
    // We can't verify OTP easily via API since we don't know it, 
    // BUT we can hit a test endpoint or we can temporarily mock verified_${email}
    console.log("Run this locally to see if any errors are caught.");
  } catch (err) {
    console.error(err);
  }
}
