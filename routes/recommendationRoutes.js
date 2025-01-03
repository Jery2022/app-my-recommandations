import { Router } from 'express';
import Recommendation from '../models/Recommendation.js';
const router = Router();

// Route pour créer une recommandation
router.post('/recommendations', async (req, res) => {
    try {
        const recommendation = new Recommendation(req.body);
        await recommendation.save();
        res.status(201).send(recommendation);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route pour obtenir toutes les recommandations
router.get('/recommendations', async (req, res) => {
    try {
        const recommendations = await find().populate('meeting assignedTo');
        res.status(200).send(recommendations);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route pour mettre à jour une recommandation 
router.put('/recommendations/:id', async (req, res) => { 
    try { 
        const recommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
        if (!recommendation) { 
            return res.status(404).send(); 
        } 
        res.status(200).send(recommendation); 
    } catch (err) { 
        res.status(400).send(err); 
    } 
});

// Route pour supprimer une recommandation 
router.delete('/recommendations/:id', async (req, res) => { 
    try { 
        const recommendation = await Recommendation.findByIdAndDelete(req.params.id); 
        if (!recommendation) { 
            return res.status(404).send(); 
        } 
        res.status(200).send(recommendation); 
    } catch (err) { 
        res.status(500).send(err);
     } 
    });

export default router;
