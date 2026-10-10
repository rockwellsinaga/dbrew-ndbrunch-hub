require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require("./config/sequelize");
const { startSequelize } = require("./utlis/sequelize");
require("./models/contact-models");
require("./models/register-models");

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",").map((origin) => origin.trim());
app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/contact", require("./routes/contact-routes"));
app.use("/register", require("./routes/register-routes"));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Terjadi kesalahan pada server." });
});

const startServer = async () => {
  await startSequelize(sequelize);
  return app.listen(PORT, () => console.log(`server running on port ${PORT}`));
};

if (require.main === module) startServer().catch(() => { process.exitCode = 1; });
module.exports = { app, startServer };
