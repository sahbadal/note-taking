import express from 'express';
import { createNote, getUserNotes, deleteNote } from '../controllers/noteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createNote);
router.get('/', protect, getUserNotes);
router.delete('/:id', protect, deleteNote);

export default router;
