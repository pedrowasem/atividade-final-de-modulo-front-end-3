import { combineReducers } from '@reduxjs/toolkit';

import loadingSlice from './Loading/loadingSlice';
import notesSlice from './Notes/notesSlice';
import snackBarSlice from './SnackBar/snackBarSlice';
import themeSlice from './Theme/themeSlice';
import usersSlice from './Users/usersSlice';

const rootReducer = combineReducers({
	users: usersSlice,
	loading: loadingSlice,
	snack: snackBarSlice,
	notes: notesSlice,
	theme: themeSlice,
});

export default rootReducer;
