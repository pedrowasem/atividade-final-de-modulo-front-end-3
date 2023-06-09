import { Box } from '@mui/material';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				padding: '0px',
				margin: '0px',
				height: 'min-content',
				zIndex: '-1',
				backgroundImage: 'linear-gradient(to right, #b3b3b3, #292929)',
			}}>
			{children}
		</Box>
	);
};

export default Layout;
