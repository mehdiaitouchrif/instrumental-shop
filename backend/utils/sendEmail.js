const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: `
        <header style="padding:0 10px; margin: 0;">
            <h1 style="font-size: 28px; font-weight: 400; margin: 0;">Instrumental Shop </h1>
        </header>
        <main style="font-family: Arial, sans-serif; padding: 10px;">
            <p style="font-size: 16px; margin: 5px 0; line-height: 1.6;"> ${options.message}</p>
            <div style="margin: 14px 0;">
                <a href="${options.url}" style="display: inline-block; text-decoration: none; padding: 10px 20px; font-size: 17px; background: #d87d4a; color: #fff; border-radius: 2px;">${options.buttonTitle}</a>
            </div>
        </main>
        <hr style="border-top: 0.75px solid #f4f4f4; padding: 0 10px;" />
        <footer style="padding: 20px 10px; background: #f9f9f9; margin-top: 20px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.2;">
            <p>You recieved this email because you registred for an account on Instrumental Shop.
            <p>&copy; 2022 Instrumental Shop.</p> 
        </footer>
    `,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
