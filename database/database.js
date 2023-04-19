const { Sequelize } = require("sequelize");

const connection = new Sequelize (
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
)

async function authenticate(connection) {
  try {
    await connection.authenticate();
  }
  catch (e) {
    console.log("Ocorreu um erro: ", e);
  }
}

module.exports = {connection, authenticate};