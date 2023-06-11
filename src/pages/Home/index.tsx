import { Add } from '@mui/icons-material';
import { Box, Fab, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyAppBar from '../../Components/AppBar';
import ModalNotes from '../../Components/ModalNotes';
import NoteCard from '../../Components/NoteCard';
import { useAppSelector } from '../../store/hooks';
import { listAllNotes } from '../../store/modules/Notes/notesSlice';

const Home: React.FC = () => {
	const [open, setOpen] = useState(false);

	const [userLogged] = useState(
		(sessionStorage.getItem('userLogged') ?? localStorage.getItem('userLogged')) as string,
	);

	const notesList = useAppSelector(listAllNotes);
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('userLogged') && !sessionStorage.getItem('userLogged')) {
			navigate('/');
		}
	}, [navigate]);
	return (
		<Box
			sx={{
				minHeight: '100%',
			}}>
			<MyAppBar />
			<Grid
				container
				spacing={2}
				sx={{
					width: '95%',
					margin: '36px auto 0 auto',
					padding: '36px',
					borderRadius: '20px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
				}}>
				{notesList
					.filter((note) => note.createdBy === userLogged)
					.map((note) => (
						<NoteCard note={note} key={note.id} />
					))}
			</Grid>
			<Fab
				color="secondary"
				aria-label="add"
				sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
				onClick={() => setOpen(true)}>
				<Add />
			</Fab>
			<ModalNotes context="create" open={open} setOpen={setOpen} />
		</Box>
	);
};

export default Home;
