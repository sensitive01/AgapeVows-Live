const formSubmission = (formName, details) => {
  let detailsHtml = "";
  for (const [key, value] of Object.entries(details)) {
    detailsHtml += `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>${key}:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #A020F0; text-align: center;">New ${formName} Submission</h2>
      <p>Hello Admin,</p>
      <p>A new ${formName} has been submitted on the Agape Vows Matrimony platform. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        ${detailsHtml}
      </table>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Agape Vows Matrimony. All rights reserved.</p>
    </div>
  `;
};

module.exports = formSubmission;
