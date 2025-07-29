import { Request, Response } from 'express';
import Note from '../models/Note';

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const user = (req as any).user;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const note = await Note.create({
      title,
      content,
      user: user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note', error });
  }
};

export const getUserNotes = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    const notes = await Note.find({ user: user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes', error });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: id, user: user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
};
