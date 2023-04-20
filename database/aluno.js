const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("aluno", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo nome é obrigatório.'
      },
      notEmpty: {
        msg: 'O campo nome é obrigatório.'
      }
    }
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Matrícula já cadastrada.'
    },
    validate: {
      notNull: {
        msg: 'O campo matrícula é obrigatório.'
      },
      notEmpty: {
        msg: 'O campo matrícula é obrigatório.'
      },
    }
  },
  media: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo média é obrigatório.'
      },
      notEmpty: {
        msg: 'O campo média é obrigatório.'
      },
      isNumeric: {
        msg: 'O campo média deve ser numérico'
      }
    }
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O campo curso é obrigatório.'
      },
      notEmpty: {
        msg: 'O campo curso é obrigatório.'
      }
    }
  }
})

module.exports = Aluno;