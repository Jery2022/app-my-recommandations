import { Router } from 'express';
const router = Router();
import Meeting, { find } from '../models/Meeting';

// Route pour créer une réunion
router.post('/meetings', async (req, res) => {
    try {
        const meeting = new Meeting(req.body);
        await meeting.save();
        res.status(201).send(meeting);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route pour obtenir toutes les réunions
router.get('/meetings', async (req, res) => {
    try {
        const meetings = await find().populate('attendees');
        res.status(200).send(meetings);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route pour mettre à jour une réunion 
router.put('/meetings/:id', async (req, res) => { 
    try { 
        const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
    if (!meeting) { 
        return res.status(404).send(); 
    } 
    res.status(200).send(meeting); 
    } catch (err) { 
        res.status(400).send(err);
    }
});

// Route pour supprimer une réunion 
router.delete('/meetings/:id', async (req, res) => { 
    try { 
        const meeting = await Meeting.findByIdAndDelete(req.params.id); 
        if (!meeting) { return res.status(404).send(); 
        } 
        res.status(200).send(meeting); 
    } catch (err) { 
        res.status(500).send(err); 
    } 
});

export default router;
