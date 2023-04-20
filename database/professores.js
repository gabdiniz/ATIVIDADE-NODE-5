const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Professores = connection.define("professores", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo nome é obrigatório.',
      },
      notEmpty: {
        msg: 'O campo nome é obrigatório'
      }
    },
  },
  materia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo matéria é obrigatório.',
      },
      notEmpty: {
        msg: 'O campo matéria é obrigatório'
      }
    },
  },
  salario: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo salario é obrigatório.',
      },
      isNumeric: {
        msg: "O campo salario deve ser numérico"
      },
      notEmpty: {
        msg: 'O campo salario é obrigatório'
      }
    },
  },
  turno: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo turno é obrigatório.',
      },
      notEmpty: {
        msg: 'O campo turno é obrigatório'
      }
    },
  }
})

module.exports = Professores;