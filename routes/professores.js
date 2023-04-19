const Professores = require("../database/professores");
const { Router } = require("express");

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

router.post("/professores", async (req, res) => {
  const {nome, materia, salario, turno} = req.body; 
  try {
    const novoProfessor = await Professores.create({nome, materia, salario, turno});
    res.status(201).json(novoProfessor);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.put("/professores/:id", async (req, res) => {
  const {nome, materia, salario, turno} = req.body; 
  try {
    const professor = await Professores.findByPk(req.params.id);
    if (professor) {
      professor.update({nome, materia, salario, turno});
      res.status(200).json("Professor editado.");
    }
    else {
      res.status(404).json({ message: "Professor não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/professores/:id", async (req, res) => {
  try {
    const professor = await Professores.findByPk(req.params.id);
    if (professor) {
      professor.destroy();
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