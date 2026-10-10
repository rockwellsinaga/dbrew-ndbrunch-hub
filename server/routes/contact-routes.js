const { Router } = require("express");
const { createDataContact } = require("../service/contact-service");

const router = Router();

router.post("/", async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name?.trim() || !email?.includes("@") || !message?.trim()) return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi." });
  try {
    const result = await createDataContact(name.trim(), email.trim(), message.trim());
    return res.status(201).json({ message: "Pesan berhasil dikirim.", data: { id: result.id, name: result.name, email: result.email } });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
