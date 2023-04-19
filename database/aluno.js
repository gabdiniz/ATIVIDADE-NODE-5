const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("aluno", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: false
  },
  media: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Aluno;