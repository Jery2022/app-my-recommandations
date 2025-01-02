import { Router } from 'express';
const router = Router();
import Recommendation, { find } from '../models/Recommendation';

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

export default router;
