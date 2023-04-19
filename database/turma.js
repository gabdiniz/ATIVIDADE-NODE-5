const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Turma = connection.define("turma", {
  classe: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  academico: {
    type: DataTypes.STRING,
    allowNull: false  
  },
  periodo: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const Aluno = require("./aluno");
Turma.hasMany(Aluno);
Aluno.belongsTo(Turma);

module.exports = Turma;