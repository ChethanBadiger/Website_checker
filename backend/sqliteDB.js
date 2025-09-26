const Database = require("better-sqlite3");

const db = new Database("./urls.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT
  )
`
).run();

module.exports = db;
