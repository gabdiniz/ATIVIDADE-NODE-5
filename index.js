require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const { connection, authenticate } = require("./database/database");
authenticate(connection);

const rotasTurmas = require("./routes/turmas");
const rotasAlunos = require("./routes/alunos");
const rotasProfessores = require("./routes/professores");

app.use(rotasProfessores);
app.use(rotasAlunos);
app.use(rotasTurmas);

app.listen(3000, () => {
  connection.sync();
  console.log("Servidor rodando em http://localhost:3000/")
})