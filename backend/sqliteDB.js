import Database from "better-sqlite3";
const db = new Database("urls.db");

const query = `
CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL
    )`;

db.exec(query);