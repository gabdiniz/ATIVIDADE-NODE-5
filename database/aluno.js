const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("aluno", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  media: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Aluno;