export const formatPhoneNumber = (phone) => {
  if (!phone) return "N/A";
  const p = String(phone).replace(/\D/g, ''); // Extract only digits

  if (p.length === 12 && p.startsWith('91')) {
    return `+91 ${p.slice(2)}`;
  } else if (p.length === 10) {
    return `+91 ${p}`;
  }
  
  // If it matches neither, return original format
  return phone;
};
