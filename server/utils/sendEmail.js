import transporter from "../config/emailConfig.js"

const sendEmail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: `"Hubnet" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};
export default sendEmail
