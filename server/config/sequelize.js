// init sequalize config
const Sequelize = require("sequelize");

const MYSQL_URI = process.env.MYSQL_URI;

if (!MYSQL_URI) {
  throw new Error("MYSQL_URI is required. Copy .env.example to .env and set it.");
}

const sequelize = new Sequelize(MYSQL_URI, {
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
});


module.exports = sequelize;
