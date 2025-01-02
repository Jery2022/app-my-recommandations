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

export default router;
