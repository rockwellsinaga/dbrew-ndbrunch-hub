const { pool } = require("../config/database");

const createDataContact = async (name, email, message) => {
  const normalizedEmail = email.toLowerCase();
  const [result] = await pool.execute(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, normalizedEmail, message]
  );
  return { id: result.insertId, name, email: normalizedEmail };
};

module.exports = { createDataContact };
