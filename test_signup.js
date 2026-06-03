const axios = require('axios');

async function testSignup() {
  try {
    // 1. Send OTP
    console.log("Sending OTP...");
    const email = "test_ajay123@example.com";
    await axios.post('http://localhost:3001/user/send-registration-otp', { email });
    
    // 2. We can't easily get the OTP because it's printed to the terminal or emailed.
    // Let's modify the backend temporarily to return the OTP in the response or we can just read it from the code.
  } catch(e) {
    console.error(e.response ? e.response.data : e.message);
  }
}

testSignup();
