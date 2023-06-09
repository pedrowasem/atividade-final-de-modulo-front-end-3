import { createTheme } from '@mui/material/styles';

const light = createTheme({
	palette: {
		mode: 'light',
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#000000',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: '#0066ff',
			main: '#0044ff',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffcc00',
		},
	},
});

const dark = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#ffffff',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: '#0066ff',
			main: '#d9d9d9',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffcc00',
		},
	},
});

export { light, dark };
