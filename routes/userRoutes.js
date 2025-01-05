import { Router } from 'express';
import User  from '../models/User.js';
import authMiddlewares from '../middleware/authMiddleware.js';

const authMiddleware = authMiddlewares;

const router = Router();

// Route pour créer un utilisateur
router.post('/users', authMiddleware, async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route pour obtenir tous les utilisateurs
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route pour mettre à jour un utilisateur 
router.put('/users/:id', authMiddleware, async (req, res) => { 
    try { 
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
        if (!user) { 
            return res.status(404).send(); 
        } 
        res.status(200).send(user); 
    } catch (err) { 
        res.status(400).send(err); 
    } 
});

// Route pour supprimer un utilisateur 
router.delete('/users/:id', authMiddleware, async (req, res) => { 
    try { 
        const user = await User.findByIdAndDelete(req.params.id); 
        if (!user) { 
            return res.status(404).send(); 
        } res.status(200).send(user); 
    } catch (err) { 
        res.status(500).send(err); 
    } 
});

export default router;
