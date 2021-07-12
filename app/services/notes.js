import DataLoader from 'dataloader';
import queries from '../db/queries';
import db from '../db/setup';

export const notesByUserIds = async (userIds) => {
  const notes = await db.manyOrNone(queries.getUserNotes, [[userIds]]);
  return userIds.map((el) => notes.filter((n) => n.userId === el));
};

export const notesDataLoader = () => new DataLoader(notesByUserIds);
