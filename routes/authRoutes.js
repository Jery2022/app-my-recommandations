import { Router } from 'express';
import User from '../models/User.js';
import fone from '../models/User.js';
import mySecret from '../config/secret.js';
import psign from 'jsonwebtoken';
import pkg from 'bcryptjs';

const { secret }  = mySecret;
const router = Router();
const { compare } = pkg;
const { findOne } = fone;
const { sign } = psign;

// Route pour l'inscription
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findOne({ email });
        if (!user || !await compare(password, user.password)) {
            return res.status(401).send('Email ou mot de passe incorrect.');
        }
        const token = sign({ userId: user._id, role: user.role }, secret, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;

