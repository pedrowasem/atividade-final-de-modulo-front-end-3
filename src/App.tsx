/* eslint-disable no-constant-condition */
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import AppRoutes from './configs/routes/AppRoutes';
import { getTheme } from './configs/theme';
import { persistor } from './store';
import { useAppSelector } from './store/hooks';

function App() {
	const nameTheme = useAppSelector((state) => state.theme) as 'light' | 'dark';
	const [theme, setThemeState] = useState(getTheme(nameTheme));

	useEffect(() => {
		setThemeState(getTheme(nameTheme));
	}, [nameTheme]);
	return (
		<PersistGate loading={<h1>Aguarde...</h1>} persistor={persistor}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppRoutes />
			</ThemeProvider>
		</PersistGate>
	);
}

export default App;
