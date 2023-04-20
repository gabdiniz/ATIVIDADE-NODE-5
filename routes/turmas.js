const Professores = require("../database/professores");
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

router.get("/turmas/academico/:academico", async (req, res) => {
  try {
    const turmas = await Turma.findAll({ where: { academico: req.params.academico } });
    if (turmas) {
      res.status(200).json(turmas);
    }
    else {
      res.status(404).json({ message: "Nenhuma turma encontrada. "});
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/turmas/periodo/:periodo", async (req, res) => {
  try {
    const turmas = await Turma.findAll({ where: { periodo: req.params.periodo } });
    if (turmas) {
      res.status(200).json(turmas);
    }
    else {
      res.status(404).json({ message: "Nenhuma turma encontrada." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})


router.post("/turmas", async (req, res) => {
  const { classe, academico, periodo, professoreId } = req.body;
  try {
    const professor = await Professores.findByPk(professoreId);
    if (professor) {
      const novaTurma = await Turma.create({ classe, academico, periodo, professoreId });
      res.status(201).json(novaTurma);
    }
    else {
      res.status(404).json({ message: "Professor não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro."});
  }
});

router.put("/turmas/:id", async (req, res) => {
  const { classe, academico, periodo, professoreId } = req.body;
  try {
    const professor = await Professores.findByPk(professoreId);
    if (professor) {
      const turma = await Turma.findByPk(req.params.id);
      if (turma) {
        await turma.update({ classe, academico, periodo, professoreId });
        res.status(200).json("Turma editada.");
      }
      else {
        res.status(404).json("Turma não encontrada.");
      }
    }
    else {
      res.status(404).json("Professor não encontrado.");
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
