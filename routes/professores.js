/**
 * @swagger
 * components:
 *   schemas:
 *     Professores:
 *       type: object
 *       required:
 *         - nome
 *         - materia
 *         - salario
 *         - turno
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do professor
 *         materia:
 *           type: string
 *           description: Materia que o professor leciona
 *         salario:
 *           type: number
 *           description: Salario bruto do professor
 *         turno:
 *           type: string
 *           description: Turno de trabalho do professor
 */

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: CRUD professores
 * /Professores:
 *   get:
 *     summary: Listar todos professores
 *     tags: [Professores]
 *     responses:
 *       200:
 *         description: Listar todos os professores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professores'
 *   post:
 *     summary: Adicionar professor.
 *     tags: [Professores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professores'
 *     responses:
 *       201:
 *         description: Professor adicionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professores'
 *       500:
 *         description: Ocorreu um erro.
 * /professores/{id}:
 *   get:
 *     summary: Listar professor por id.
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do professor.
 *     responses:
 *       200:
 *         description: Professor encontrado por id.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professores'
 *       404:
 *         description: Professor não encontrado.
 *   put:
 *    summary: Atualizar professor por id.
 *    tags: [Professores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id do professor.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Professores'
 *    responses:
 *      200:
 *        description: Professor atualizado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Professores'
 *      404:
 *        description: Professor não encontrado.
 *      500:
 *        description: Ocorreu um erro.
 *   delete:
 *     summary: Remover professor por id.
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do professor.
 *
 *     responses:
 *       200:
 *         description: Professor removido.
 *       404:
 *         description: Professor não encontrado.
 * /professores/materia/{materia}:
 *   get:
 *     summary: Listar professor por materia.
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: materia
 *         schema:
 *           type: string
 *         required: true
 *         description: Materia do professor.
 *     responses:
 *       200:
 *         description: Professor encontrado por materia.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professores'
 *       404:
 *         description: Professor não encontrado.
 * /professores/turno/{turno}:
 *   get:
 *     summary: Listar professor por turno.
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: turno
 *         schema:
 *           type: string
 *         required: true
 *         description: Turno do professor.
 *     responses:
 *       200:
 *         description: Professor encontrado por turno.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professores'
 *       404:
 *         description: Professor não encontrado.
 * /professores/salario/{salario}:
 *   get:
 *     summary: Listar professor por salario > .
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: salario
 *         schema:
 *           type: number
 *         required: true
 *         description: Salario do professor.
 *     responses:
 *       200:
 *         description: Professor encontrado por salario.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professores'
 *       404:
 *         description: Professor não encontrado.
 */
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