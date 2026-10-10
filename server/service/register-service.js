const { pool } = require("../config/database");
const { randomBytes, scrypt: scryptCallback, timingSafeEqual } = require("node:crypto");
const { promisify } = require("node:util");

const scrypt = promisify(scryptCallback);

const createDataRegister = async (username, email, password) => {
  const normalizedEmail = email.toLowerCase();
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  const passwordHash = `${salt}:${derivedKey.toString("hex")}`;
  const [result] = await pool.execute(
    "INSERT INTO accounts (username, email, password_hash) VALUES (?, ?, ?)",
    [username, normalizedEmail, passwordHash]
  );
  return { id: result.insertId, username, email: normalizedEmail };
};

const authenticateRegister = async (username, password) => {
  const [rows] = await pool.execute(
    "SELECT id, username, email, password_hash FROM accounts WHERE username = ? LIMIT 1",
    [username]
  );
  const account = rows[0];
  if (!account) return null;
  const [salt, storedHex] = account.password_hash.split(":");
  const storedKey = Buffer.from(storedHex, "hex");
  const derivedKey = await scrypt(password, salt, storedKey.length);
  if (!timingSafeEqual(storedKey, derivedKey)) return null;
  return { id: account.id, username: account.username, email: account.email };
};

module.exports = { createDataRegister, authenticateRegister };
