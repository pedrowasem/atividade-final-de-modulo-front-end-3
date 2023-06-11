import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { User } from '../../types/User';

const usersAdapter = createEntityAdapter<User>({
	selectId: (state) => state.email,
});

export const { selectAll: getUser } = usersAdapter.getSelectors(
	(global: RootState) => global.users,
);

const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState(),
	reducers: {
		addUser: usersAdapter.addOne,
	},
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
