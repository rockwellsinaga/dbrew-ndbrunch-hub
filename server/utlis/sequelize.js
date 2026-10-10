const { Sequelize } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 */
const startSequelize = async (sequelize) => {
  try {
    // untuk mengecek koneksi ke database
    await sequelize.authenticate();

    // untuk melakukan sinkronisasi model ke database
    await sequelize.sync();

    // untuk melakukan debug sequelize
    console.log("Connection to database established!");
    console.log(
      "Available models on sequelize =>",
      Object.keys(sequelize.models).join(", ")
    );
  } catch (error) {
    console.error("Failed to establish connection to database!", error);
    throw error;
  }
};

module.exports = {
    startSequelize,
};
