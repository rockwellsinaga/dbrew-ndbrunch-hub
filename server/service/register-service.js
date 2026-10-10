const Register = require("../models/register-models");
const { randomBytes, scrypt: scryptCallback, timingSafeEqual } = require("node:crypto");
const { promisify } = require("node:util");

const scrypt = promisify(scryptCallback);

const createDataRegister = async (username, email, password) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  const passwordHash = `${salt}:${derivedKey.toString("hex")}`;
  return Register.create({ username, email: email.toLowerCase(), passwordHash });
};

const authenticateRegister = async (username, password) => {
  const account = await Register.findOne({ where: { username } });
  if (!account) return null;
  const [salt, storedHex] = account.passwordHash.split(":");
  const storedKey = Buffer.from(storedHex, "hex");
  const derivedKey = await scrypt(password, salt, storedKey.length);
  if (!timingSafeEqual(storedKey, derivedKey)) return null;
  return { id: account.id, username: account.username, email: account.email };
};

module.exports = { createDataRegister, authenticateRegister };
