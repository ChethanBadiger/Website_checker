import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "gauresh99999@gmail.com",
    pass: "lyiqwhdwudaxgqku",
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: '"Gauresh Gaude" <gauresh99999@gmail.com>',
    to: "chethanbadiger245@gmail.com",
    subject: "Website Checker summary",
    text: "Hello world this is Website checker", 
    html: "<b> Bruhh  </b>", 
  });

  console.log("Message sent:", info.messageId);
})();