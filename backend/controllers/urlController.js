const db = require("../sqliteDB");

// Save (replace) all URLs
exports.saveUrls = (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input. 'urls' must be a non-empty array." });
    }

    // Clear existing URLs
    db.prepare("DELETE FROM urls").run();

    // Insert new URLs
    const stmt = db.prepare("INSERT INTO urls (url) VALUES (?)");
    const insertMany = db.transaction((urls) => {
      urls.forEach((url) => stmt.run(url));
    });
    insertMany(urls);

    res.json({ message: "URLs saved successfully.", count: urls.length });
  } catch (err) {
    console.error("Error saving URLs:", err);
    res.status(500).json({ error: "Failed to save URLs." });
  }
};

// Get all URLs
exports.getUrls = (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM urls").all();
    res.json(rows);
  } catch (err) {
    console.error("Error retrieving URLs:", err);
    res.status(500).json({ error: "Failed to retrieve URLs." });
  }
};
