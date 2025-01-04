import { Router } from 'express';
import Task  from '../models/Task.js';

const router = Router();

// Route pour créer une tâche
router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route pour obtenir toutes les tâches
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo recommendation');
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route pour mettre à jour une tâche
router.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route pour supprimer une tâche
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;