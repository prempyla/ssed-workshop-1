import { Router, Request, Response } from 'express';
import FestManager from '../controllers/FestManager';
import { Participant } from '../models/Participant';

const router = Router();
const festManager = new FestManager();

router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

router.get('/participants', (req: Request, res: Response) => {
    const participants = festManager.getAllParticipants().map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        college: p.college,
        events: p.events,
        details: p.getDetails()
    }));
    res.json(participants);
});

router.get('/participants/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const participant = festManager.getParticipant(id);

    if (participant) {
        res.json({
            id: participant.id,
            name: participant.name,
            email: participant.email,
            college: participant.college,
            events: participant.events,
            details: participant.getDetails()
        });
    } else {
        res.status(404).json({ error: 'Participant not found' });
    }
});

router.post('/participants', (req: Request, res: Response) => {
    const { name, email, college } = req.body;

    if (!name || !email || !college) {
        return res.status(400).json({ error: 'Missing required fields: name, email, college' });
    }

    const newParticipant = new Participant(name, email, college);
    festManager.addParticipant(newParticipant);

    res.status(201).json({
        message: 'Participant created successfully',
        id: newParticipant.id,
        details: newParticipant.getDetails()
    });
});

router.patch('/participants/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const { name, college, event } = req.body;

    const participant = festManager.getParticipant(id);

    if (!participant) {
        return res.status(404).json({ error: 'Participant not found' });
    }

    if (name || college) {
        festManager.updateParticipantDetails(id, name, college);
    }

    if (event) {
        participant.registerForEvent(event);
    }

    res.json({
        message: 'Participant updated successfully',
        details: participant.getDetails()
    });
});

router.delete('/participants/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const success = festManager.deleteParticipant(id);

    if (success) {
        res.json({ message: 'Participant deleted successfully' });
    } else {
        res.status(404).json({ error: 'Participant not found' });
    }
});

export default router;
