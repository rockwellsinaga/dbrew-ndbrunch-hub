const { Router } = require("express");
const { createDataRegister, authenticateRegister } = require("../service/register-service");

const router = Router();
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

router.post("/", async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username?.trim() || !isEmail(email || "") || typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ message: "Username, email valid, dan password minimal 8 karakter wajib diisi." });
  }
  try {
    const result = await createDataRegister(username.trim(), email.trim(), password);
    return res.status(201).json({ message: "Akun berhasil dibuat.", data: { id: result.id, username: result.username, email: result.email } });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Username atau email sudah digunakan." });
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username dan password wajib diisi." });
  try {
    const account = await authenticateRegister(username.trim(), password);
    if (!account) return res.status(401).json({ message: "Username atau password tidak sesuai." });
    return res.json({ message: `Selamat datang, ${account.username}!`, data: account });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
