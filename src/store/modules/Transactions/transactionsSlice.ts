import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import TransactionsModel from '../../types/Transactions';

const transactionsAdapter = createEntityAdapter<TransactionsModel>({
	selectId: (state) => state.id,
});

const transactionsSlice = createSlice({
	initialState: transactionsAdapter.getInitialState(),
	name: 'transactions',
	reducers: {
		createTransaction: transactionsAdapter.addOne,
		updateTransaction: transactionsAdapter.updateOne,
		deleteTransaction: transactionsAdapter.removeOne,
	},
});

export const { selectAll: listAllTransactions } = transactionsAdapter.getSelectors(
	(state: RootState) => state.transactions,
);

export const { createTransaction, deleteTransaction, updateTransaction } =
	transactionsSlice.actions;

export default transactionsSlice.reducer;
