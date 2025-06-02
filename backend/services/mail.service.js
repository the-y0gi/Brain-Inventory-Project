import nodemailer from 'nodemailer';

// Nodemailer transporter setup for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_KEY,
  },
});

export const sendEmailToUser = async ({ email, username, verificationToken, fullUrl }) => {

    
 
  const verificationUrl = `${fullUrl}/api/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Please verify your email address",
    text: `Hi ${username},

Thank you for registering with Brain Inventory.

Please verify your email address by clicking on the following link:

${verificationUrl}

If you did not register, please ignore this email.

Thanks,  
Team Brain Inventory
`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

