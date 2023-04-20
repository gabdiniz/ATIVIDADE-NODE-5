/**
 * @swagger
 * components:
 *   schemas:
 *     Turmas:
 *       type: object
 *       required:
 *         - classe
 *         - academico
 *         - periodo
 *         - professoreId
 *       properties:
 *         classe:
 *           type: string
 *           description: Classe da turma
 *         academico:
 *           type: string
 *           description: Nivel academico da turma
 *         periodo:
 *           type: string
 *           description: Periodo da turma
 *         professoreId:
 *           type: number
 *           description: Id do professor responsável
 */

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: CRUD turmas
 * /turmas:
 *   get:
 *     summary: Listar todas turmas
 *     tags: [Turmas]
 *     responses:
 *       200:
 *         description: Listar todas as turmas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turmas'
 *   post:
 *     summary: Adicionar turma.
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turmas'
 *     responses:
 *       201:
 *         description: Turma adicionada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turmas'
 *       500:
 *         description: Ocorreu um erro.
 * /turmas/{id}:
 *   get:
 *     summary: Listar turma por id.
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da turma.
 *     responses:
 *       200:
 *         description: Turma encontrada por id.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turmas'
 *       404:
 *         description: Turma não encontrada.
 *   put:
 *    summary: Atualizar turma por id.
 *    tags: [Turmas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id da turma.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Turmas'
 *    responses:
 *      200:
 *        description: Turma atualizada.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Turmas'
 *      404:
 *        description: Turma não encontrado.
 *      500:
 *        description: Ocorreu um erro.
 *   delete:
 *     summary: Remover turma por id.
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id da turma.
 *
 *     responses:
 *       200:
 *         description: Turma removida.
 *       404:
 *         description: Turma não encontrada.
 * /turmas/academico/{academico}:
 *   get:
 *     summary: Listar turma por nivel academico.
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: academico
 *         schema:
 *           type: string
 *         required: true
 *         description: Academico da turma.
 *     responses:
 *       200:
 *         description: Turma encontrada por academico.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turmas'
 *       404:
 *         description: Turma não encontrada.
 * /turmas/periodo/{periodo}:
 *   get:
 *     summary: Listar turma por periodo.
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: periodo
 *         schema:
 *           type: string
 *         required: true
 *         description: Periodo da turma.
 *     responses:
 *       200:
 *         description: Turma por periodo.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turmas'
 *       404:
 *         description: Turma não encontrada.
 */
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
