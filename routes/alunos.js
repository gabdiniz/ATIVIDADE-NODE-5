/**
 * @swagger
 * components:
 *   schemas:
 *     Alunos:
 *       type: object
 *       required:
 *         - nome
 *         - matricula
 *         - media
 *         - curso
 *         - turmaId
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do aluno
 *         matricula:
 *           type: string
 *           description: Matricula do aluno
 *         media:
 *           type: number
 *           description: Media do aluno
 *         curso:
 *           type: string
 *           description: Curso do aluno
 *         turmaId:
 *           type: number
 *           description: turma do aluno
 */

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: CRUD alunos
 * /Alunos:
 *   get:
 *     summary: Listar todos alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Listar todos os alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alunos'
 *   post:
 *     summary: Adicionar aluno.
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alunos'
 *     responses:
 *       201:
 *         description: Aluno adicionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       500:
 *         description: Ocorreu um erro.
 * /alunos/{id}:
 *   get:
 *     summary: Listar aluno por id.
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do aluno.
 *     responses:
 *       200:
 *         description: Aluno encontrado por id.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       404:
 *         description: Aluno não encontrado.
 *   put:
 *    summary: Atualizar aluno por id.
 *    tags: [Alunos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id do aluno.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Alunos'
 *    responses:
 *      200:
 *        description: Aluno atualizado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Alunos'
 *      404:
 *        description: Aluno não encontrado.
 *      500:
 *        description: Ocorreu um erro.
 *   delete:
 *     summary: Remover aluno por id.
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do aluno.
 *
 *     responses:
 *       200:
 *         description: Aluno removido.
 *       404:
 *         description: Aluno não encontrado.
 * /alunos/media:
 *   get:
 *     summary: Listar alunos abaixo da media.
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Aluno abaixo da media.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       404:
 *         description: Nenhum aluno encontrado.
 * /alunos/curso/{curso}:
 *   get:
 *     summary: Listar aluno por curso.
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: curso
 *         schema:
 *           type: string
 *         required: true
 *         description: Curso do aluno.
 *     responses:
 *       200:
 *         description: Aluno encontrado por curso.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       404:
 *         description: Nenhum aluno não encontrado.
 * /alunos/matricula/{matricula}:
 *   get:
 *     summary: Listar aluno por matricula.
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         schema:
 *           type: string
 *         required: true
 *         description: Matricula do aluno.
 *     responses:
 *       200:
 *         description: Aluno encontrado por matricula.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       404:
 *         description: Aluno não encontrado.
 */

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
    if (e.name === 'SequelizeValidationError') {
      const errors = e.errors.map(error => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors });
    } 
    else if (e.name === 'SequelizeUniqueConstraintError') {
      const errors = e.errors.map(error => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors });
    } 
    else {
      res.status(500).json({ message: "Ocorreu um erro." });
    }
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
    if (e.name === 'SequelizeValidationError') {
      const errors = e.errors.map(error => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors });
    } 
    else if (e.name === 'SequelizeUniqueConstraintError') {
      const errors = e.errors.map(error => ({
        field: error.path,
        message: error.message,
      }));
      res.status(400).json({ errors });
    } 
    else {
      res.status(500).json({ message: "Ocorreu um erro." });
    }
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