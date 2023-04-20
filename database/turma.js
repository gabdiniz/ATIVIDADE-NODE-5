const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Turma = connection.define("turma", {
  classe: {
    type: DataTypes.STRING(3),
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo classe é obrigatório."
      },
      notEmpty: {
        msg: "O campo classe é obrigatório."
      }
    }
  },
  academico: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo academico é obrigatório."
      },
      notEmpty: {
        msg: "O campo academico é obrigatório."
      }
    }  
  },
  periodo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo periodo é obrigatório."
      },
      notEmpty: {
        msg: "O campo periodo é obrigatório."
      }
    }
  }
})

const Aluno = require("./aluno");
Turma.hasMany(Aluno);
Aluno.belongsTo(Turma);

const Professores = require("./professores");
Professores.hasOne(Turma);
Turma.belongsTo(Professores);

module.exports = Turma;