const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Professores = connection.define("professores", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  materia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salario: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  turno: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Professores;