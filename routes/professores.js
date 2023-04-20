const Professores = require("../database/professores");
const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();

router.get("/professores", async (req, res) => {
  try {
    const professores = await Professores.findAll();
    res.status(200).json(professores);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/professores/:id", async (req, res) => {
  try {
    const professor = await Professores.findByPk(req.params.id);
    if (professor) {
      res.status(200).json(professor);
    }
    else {
      res.status(404).json({ message: "Professor não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.get("/professores/materia/:materia", async (req, res) => {
  try {
    const professores = await Professores.findAll({ where: { materia: req.params.materia } });
    if (professores) {
      res.status(200).json(professores);
    }
    else {
      res.status(404).json({ message: "Nenhum professor encontrado." })
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/professores/turno/:turno", async (req, res) => {
  try {
    const professores = await Professores.findAll({ where: { turno: req.params.turno } });
    if (professores) {
      res.status(200).json(professores);
    }
    else {
      res.status(404).json({ message: "Nenhum professor encontrado." })
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/professores/salario/:salario", async (req, res) => {
  try {
    const professores = await Professores.findAll({ where: { salario: { [Op.gt]: Number(req.params.salario) } } });
    if (professores) {
      res.status(200).json(professores);
    }
    else {
      res.status(404).json({ message: "Nenhum professor encontrado." })
    }
  }
  catch (e) {
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.post("/professores", async (req, res) => {
  const { nome, materia, salario, turno } = req.body;
  try {
    const novoProfessor = await Professores.create({ nome, materia, salario, turno });
    res.status(201).json(novoProfessor);
  }
  catch (e) {
    if (e.name === 'SequelizeValidationError') {
      const errors = e.errors.map(error => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ message: "Ocorreu um erro." })
    }
  }
});

router.put("/professores/:id", async (req, res) => {
  try {
    const { nome, materia, salario, turno } = req.body;
    const professor = await Professores.findByPk(req.params.id);
    if (professor) {
      await professor.update({ nome, materia, salario, turno });
      res.status(200).json("Professor editado.");
    }
    else {
      res.status(404).json({ message: "Professor não encontrado." });
    }
  }
  catch (e) {
    if (e.name === 'SequelizeValidationError') {
      const errors = e.errors.map(error => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ message: "Ocorreu um erro." })
    }
  }
});

router.delete("/professores/:id", async (req, res) => {
  try {
    const professor = await Professores.findByPk(req.params.id);
    if (professor) {
      await professor.destroy();
      res.status(200).json("Professor removido.");
    }
    else {
      res.status(404).json({ message: "Professor não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

module.exports = router;