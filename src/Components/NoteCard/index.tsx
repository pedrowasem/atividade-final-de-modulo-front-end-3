import { Delete, Edit } from '@mui/icons-material';
import {
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useState } from 'react';

import NotesModel from '../../store/types/Notes';
import ModalNotes from '../ModalNotes';

interface NoteProps {
	note: NotesModel;
}

const NoteCard: React.FC<NoteProps> = ({ note }) => {
	const [open, setOpen] = useState(false);
	const [, setDeleta] = useState(false);
	const [update, setUpdate] = useState(false);
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card
				sx={{
					minWidth: 275,
					borderRadius: '20px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
				}}>
				<CardContent>
					<Typography variant="h5" component="div">
						{note.title}
					</Typography>
					<Divider />
					<Typography variant="body1" paddingY={1}>
						{note.description}
					</Typography>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: 'space-between', paddingX: '16px' }}>
					<Typography variant="caption">
						{note.createdAt}
						<br />
						{note.modified ? `(Modificado em ${note.modifiedAt})` : ''}
					</Typography>
					<Stack direction="row" spacing={1}>
						<IconButton
							aria-label="edit"
							onClick={() => {
								setOpen(true);
								setUpdate(true);
								setDeleta(false);
							}}>
							<Edit />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => {
								setOpen(true);
								setUpdate(false);
								setDeleta(true);
							}}>
							<Delete />
						</IconButton>
					</Stack>
				</CardActions>
			</Card>
			<ModalNotes
				context={update ? 'update' : 'delete'}
				open={open}
				setOpen={setOpen}
				noteSelected={note}
			/>
		</Grid>
	);
};

export default NoteCard;
