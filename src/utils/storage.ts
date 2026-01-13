import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from './uuid';

export type Note = {
  id: string;
  title?: string;
  text: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
};

const NOTES_PREFIX = 'RN_NOTES_USER_';

export const getNotesKey = (email:string) => NOTES_PREFIX + email;

export const loadNotes = async (email:string): Promise<Note[]> => {
  const raw = await AsyncStorage.getItem(getNotesKey(email));
  return raw ? JSON.parse(raw) : [];
};

export const saveNotes = async (email:string, notes:Note[]) => {
  await AsyncStorage.setItem(getNotesKey(email), JSON.stringify(notes));
};
export const addNote = async (email:string, note: Omit<Note,'id'|'createdAt'>) => {
  const notes = await loadNotes(email);
  const newNote: Note = {...note, id: uuidv4(), createdAt: new Date().toISOString()};
  notes.push(newNote);
  await saveNotes(email, notes);
  return newNote;
};


export const updateNote = async (email:string, id:string, updates: Partial<Note>) => {
  const notes = await loadNotes(email);
  const idx = notes.findIndex(n=>n.id===id);
  if (idx===-1) throw new Error('Not found');
  notes[idx] = {...notes[idx], ...updates, updatedAt: new Date().toISOString()};
  await saveNotes(email, notes);
  return notes[idx];
};

export const deleteNote = async (email:string, id:string) => {
  let notes = await loadNotes(email);
  notes = notes.filter(n=>n.id!==id);
  await saveNotes(email, notes);
};
