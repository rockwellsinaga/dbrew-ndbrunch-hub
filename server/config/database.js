const mysql = require("mysql2/promise");

const MYSQL_URI = process.env.MYSQL_URI;
if (!MYSQL_URI) throw new Error("MYSQL_URI is required. Copy .env.example to .env and set it.");

const pool = mysql.createPool({
  uri: MYSQL_URI,
  connectionLimit: 10,
  enableKeepAlive: true,
});

const startDatabase = async () => {
  await pool.query("SELECT 1");
  await pool.query(`CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(254) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
};

module.exports = { pool, startDatabase };
