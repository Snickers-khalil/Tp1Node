const express = require('express');
const router = express.Router();
// let voiture = require('../data/voiture_module');

let voiture = [
    { id: 1, name: "clio" },
    { id: 2, name: "megane" },
    { id: 3, name: "range" }
];
/**
 * @swagger
 * components:
 *   schemas:
 *     Voiture:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la voiture
 *         name:
 *           type: string
 *           description: Nom de la voiture
 */

/**
 * @swagger
 * /voitureAPi/fetchAll:
 *   get:
 *     summary: Retourne la liste de toutes les voitureAPi
 *     tags: [voitureAPi]
 *     responses:
 *       200:
 *         description: Liste des voitureAPi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voiture'
 */
router.get('/fetchAll', (req, res) => {
    res.json(voiture);
});

/**
 * @swagger
 * /voitureAPi/{id}:
 *   get:
 *     summary: Retourne une voiture par ID
 *     tags: [voitureAPi]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la voiture
 *     responses:
 *       200:
 *         description: Voiture trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voiture'
 *       404:
 *         description: Voiture non trouvée
 */
router.get('/:id', (req, res) => {
    const v = voiture.find(v => v.id === parseInt(req.params.id));
    if (v) {
        res.json(v);
    } else {
        res.status(404).json({ message: 'Voiture not found' });
    }
});

/**
 * @swagger
 * /voitureAPi:
 *   post:
 *     summary: Ajoute une nouvelle voiture
 *     tags: [voitureAPi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voiture'
 *     responses:
 *       201:
 *         description: Voiture ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voiture'
 */
router.post('/', (req, res) => {
    const { id, name } = req.body;
    const newVoiture = { id, name };
    voiture.push(newVoiture);
    res.status(201).json(newVoiture);
}); 

/**
 * @swagger
 * /voitureAPi/{id}:
 *   put:
 *     summary: Modifie une voiture par ID
 *     tags: [voitureAPi]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la voiture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Voiture'
 *     responses:
 *       200:
 *         description: Voiture modifiée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voiture'
 *       404:
 *         description: Voiture non trouvée
 */
router.put('/:id', (req, res) => {
    const v = voiture.find(v => v.id === parseInt(req.params.id)); 
    if (v) {
        const { name } = req.body;
        voiture.name = name; 
        res.json(voiture);
    } else {
        res.status(404).json({ message: 'Voiture not found' });
    }
});

/**
 * @swagger
 * /voitureAPi/{id}:
 *   delete:
 *     summary: Supprime une voiture par ID
 *     tags: [voitureAPi]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la voiture
 *     responses:
 *       204:
 *         description: Voiture supprimée
 *       404:
 *         description: Voiture non trouvée
 */
router.delete('/:id', (req, res) => {
    const index = voiture.findIndex(v => v.id === parseInt(req.params.id));
    if (index !== -1) {
        voiture.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Voiture not found' });
    }
});

module.exports = router;
