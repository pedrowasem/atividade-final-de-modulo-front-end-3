import { Box } from '@mui/material';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				padding: '0px ',
				paddingBottom: '36px',
				margin: '0px',
				minHeight: '100vh',
				zIndex: '-1',
				backgroundColor: 'background',
			}}>
			{children}
		</Box>
	);
};

export default Layout;
