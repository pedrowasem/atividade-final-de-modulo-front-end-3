/* eslint-disable no-constant-condition */
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppRoutes from './configs/routes/AppRoutes';
import { dark, light } from './configs/theme';
import { persistor, store } from './store';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<h1>Aguarde...</h1>} persistor={persistor}>
				<ThemeProvider theme={5 == 5 ? dark : light}>
					<CssBaseline />
					<AppRoutes />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}

export default App;
