import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "ed.breitenberg78@ethereal.email",
    pass: "cKdTZG9FBq8YE7Vb4u",
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: '"Gauresh Gaude" <breitenberg78@ethereal.email>',
    to: "gauresh99999@gmail.com, baz@example.com",
    subject: "Website Checker summary",
    text: "Hello world this is Website checker", 
    html: "<b> Bruhh  </b>", 
  });

  console.log("Message sent:", info.messageId);
})();