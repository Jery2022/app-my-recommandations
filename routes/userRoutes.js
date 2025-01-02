import { Router } from 'express';
const router = Router();
import User, { find } from '../models/User';

// Route pour créer un utilisateur
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route pour obtenir tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
        const users = await find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
