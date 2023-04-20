require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(3000, () => {
  connection.sync({ force: true });
  console.log("Servidor rodando em http://localhost:3000/")
})