import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/api/send-results", async (req, res) => {
  try {
    const results = req.body.results;

    if (!results || !Array.isArray(results)) {
      return res.status(400).json({ error: "Invalid or missing results data" });
    }
    await sendResultsEmail(results);

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(" Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

async function sendResultsEmail(results) {
  try {
    const resultsHtml = `
      <h2>Website Checker Summary</h2>
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>URL</th>
            <th>Status</th>
            <th>Errors</th>
            <th>Final URL</th>
          </tr>
        </thead>
        <tbody>
          ${results
            .map(
              (r) => `
              <tr>
                <td><a href="${r.url}" target="_blank">${r.url}</a></td>
                <td>${r.status}</td>
                <td>${Array.isArray(r.errors) ? r.errors.join(", ") : r.errors || "-"}</td>
                <td>${r.finalUrl || "N/A"}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;

    const info = await transporter.sendMail({
      from: `"Website checker developer" <${process.env.EMAIL_USER}>`,
      to: "chethanbadiger245@gmail.com, gaureshgaude2@gmail.com",
      subject: "Website Checker Summary Report",
      text: "The website check has completed. Please see the summary below.",
      html: resultsHtml,
    });

    console.log(" Email sent successfully:", info.messageId);
  } catch (err) {
    console.error(" Failed to send results email:", err);
  }
}

const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));