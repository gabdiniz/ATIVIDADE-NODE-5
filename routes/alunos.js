const Aluno = require("../database/aluno");
const { Router } = require("express");
const Turma = require("../database/turma");
const { Op } = require("sequelize");

const router = Router();

router.get("/alunos", async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/alunos/media", async (req, res) => {
  try {
    const alunos = await Aluno.findAll({ where: { media: { [Op.lt]: 7 } } })
    if (alunos) {
      res.status(200).json(alunos);
    }
    else {
      res.status(404).json({ message: "Nenhum aluno encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/alunos/curso/:curso", async (req, res) => {
  try {
    const alunos = await Aluno.findAll({ where: { curso: req.params.curso } })
    if (alunos) {
      res.status(200).json(alunos)
    }
    else {
      res.status(404).json({ message: "Nenhum aluno encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.get("/alunos/:id", async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  try {
    if (aluno) {
      res.status(200).json(aluno);
    }
    else {
      res.status(404).json({ message: "Aluno não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/alunos/matricula/:matricula", async (req, res) => {
  try {
    const aluno = await Aluno.findOne({ where: { matricula: req.params.matricula } });
    if (aluno) {
      res.status(200).json(aluno);
    }
    else {
      res.status(404).json({ message: "Aluno não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." })
  }
});



router.post("/alunos", async (req, res) => {
  const { nome, matricula, media, curso, turmaId } = req.body;
  const turma = await Turma.findByPk(turmaId);
  try {
    if (turma) {
      const novoAluno = await Aluno.create({ nome, matricula, media, curso, turmaId });
      res.status(201).json(novoAluno);
    }
    else {
      res.status(404).json({ message: "Turma não encontrada." })
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.put("/alunos/:id", async (req, res) => {
  const { nome, matricula, media, curso, turmaId } = req.body;
  const aluno = await Aluno.findByPk(req.params.id);
  const turma = await Turma.findByPk(turmaId);
  try {
    if (turma) {
      if (aluno) {
        await aluno.update({ nome, matricula, media, curso, turmaId });
        res.status(200).json("Aluno editado.");
      }
      else {
        res.status(404).json({ message: "Aluno não encontrado." });
      }
    }
    else {
      res.status(404).json({ message: "Turma não encontrada." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/alunos/:id", async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  try {
    if (aluno) {
      aluno.destroy();
      res.status(200).json("Aluno removido.");
    }
    else {
      res.status(404).json("Aluno não encontrado.");
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json("Ocorreu um erro.");
  }
});

module.exports = router;