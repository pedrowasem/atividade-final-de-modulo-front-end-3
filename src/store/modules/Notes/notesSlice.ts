import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import NotesModel from '../../types/Notes';

const notesAdapter = createEntityAdapter<NotesModel>({
	selectId: (state) => state.id,
});

const notesSlice = createSlice({
	initialState: notesAdapter.getInitialState(),
	name: 'notes',
	reducers: {
		createNote: notesAdapter.addOne,
		updateNote: notesAdapter.updateOne,
		deleteNote: notesAdapter.removeOne,
	},
});

export const { selectAll: listAllNotes } = notesAdapter.getSelectors(
	(state: RootState) => state.notes,
);

export const { createNote, deleteNote, updateNote } = notesSlice.actions;

export default notesSlice.reducer;
