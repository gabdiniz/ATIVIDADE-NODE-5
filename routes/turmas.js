const Turma  = require("../database/turma");
const { Router } = require("express");

const router = Router();

router.get("/turmas", async (req, res) => {
  try {
    const turmas = await Turma.findAll();
    res.status(200).json(turmas);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro."});
  }
});

router.get("/turmas/:id", async (req, res) => {
  try {
    const turma = await Turma.findByPk(req.params.id);
    if (turma) {
      res.status(200).json(turma);
    }
    else {
      res.status(404).json({ message: "Turma não encontrada."});
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro."});
  }
});

router.post("/turmas", async (req, res) => {
  const { classe, academico, periodo } = req.body;
  try {
    const novaTurma = await Turma.create({ classe, academico, periodo });
    res.status(201).json(novaTurma);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro."});
  }
});

router.put("/turmas/:id", async (req, res) => {
  const { classe, academico, periodo } = req.body;
  const turma = await Turma.findByPk(req.params.id);
  try {
    if (turma) {
      await turma.update({ classe, academico, periodo });
      res.status(200).json("Turma editada.");
    }
    else {
      res.status(404).json("Turma não encontrada.");
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.delete("/turmas/:id", async (req, res) => {
  const turma = await Turma.findByPk(req.params.id);
  try {
    if (turma) {
      await turma.destroy();
      res.status(200).json("Turma removida.");
    }
    else {
      res.status(404).json("Turma não encontrada.");
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

module.exports = router;
