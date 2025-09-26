const Database = require("better-sqlite3");

// Open or create the database file
const db = new Database("./urls.db");

// Create table if it doesn’t exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT
  )
`
).run();

module.exports = db;
