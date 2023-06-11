import { Close } from '@mui/icons-material';
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
} from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { v4 as gerarId } from 'uuid';

import { useAppDispatch } from '../../store/hooks';
import { createNote, deleteNote, updateNote } from '../../store/modules/Notes/notesSlice';
import NotesModel from '../../store/types/Notes';
import { IsValidCredentials } from '../../types/IsValidCredentials';
import StyledButton from '../StyledButton';
import StyledTextField from '../StyledTextField';

interface ModalNotesProps {
	context: 'create' | 'update' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	noteSelected?: NotesModel;
}

const ModalNotes: React.FC<ModalNotesProps> = ({ context, open, setOpen, noteSelected }) => {
	const [title, setTitle] = useState(noteSelected?.title ?? '');
	const [description, setDescription] = useState(noteSelected?.description ?? '');
	const [errorTitle, setErrorTitle] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});
	const [errorDescription, setErrorDescription] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (title.length > 50 && title) {
			setErrorTitle({
				helperText: 'O títutlo não pode ter mais que 50 caracteres',
				isValid: false,
			});
		} else {
			setErrorTitle({
				helperText: '',
				isValid: true,
			});
		}
	}, [title]);

	useEffect(() => {
		setErrorDescription({
			helperText: '',
			isValid: true,
		});
	}, [description]);

	const newNote: NotesModel = {
		id: gerarId(),
		title: title,
		createdAt: new Date().toLocaleDateString('pt-Br', {
			dateStyle: 'short',
		}),

		description: description,
		createdBy: (sessionStorage.getItem('userLogged') ??
			localStorage.getItem('userLogged')) as string,
		modified: false,
	};

	const verifyInputs = () => {
		if (!title) {
			setErrorTitle({
				helperText: 'O título não pode estar vazio',
				isValid: false,
			});
		}
		if (!description) {
			setErrorDescription({
				helperText: 'A descrição não pode estar vazia',
				isValid: false,
			});
		}
		if (!errorDescription.isValid || !errorTitle.isValid || !description || !title) {
			return true;
		}
	};

	const handleModalNote = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		switch (context) {
			case 'create':
				if (verifyInputs()) {
					break;
				}
				dispatch(createNote(newNote));
				setOpen(false);
				clearInputs();

				break;

			case 'update':
				if (noteSelected) {
					if (verifyInputs()) {
						break;
					}
					dispatch(
						updateNote({
							id: noteSelected.id,
							changes: {
								title: title,
								description: description,
								modifiedAt: new Date().toLocaleDateString('pt-Br', {
									dateStyle: 'short',
								}),
								modified: true,
							},
						}),
					);
					setOpen(false);
				}

				break;
			case 'delete':
				if (noteSelected) {
					dispatch(deleteNote(noteSelected.id));
				}
				break;
			default:
		}
	};

	const clearInputs = () => {
		setTitle('');
		setDescription('');
		setErrorDescription({
			helperText: '',
			isValid: true,
		});
		setErrorTitle({
			helperText: '',
			isValid: true,
		});
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				sx: {
					borderRadius: '20px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
					backdropFilter: 'blur(6px)',
				},
			}}>
			<DialogTitle id="alert-dialog-title">
				{context === 'create' && 'Criar Novo Recado'}
				{context === 'update' && 'Editar Recado'}
				{context === 'delete' && 'Deletar Recado'}
				<IconButton
					aria-label="close"
					onClick={() => setOpen(false)}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
					}}>
					<Close />
				</IconButton>
			</DialogTitle>
			<Divider />
			<Box component="form" onSubmit={handleModalNote}>
				{context !== 'delete' && (
					<DialogContent sx={{ marginY: 2 }}>
						<Grid container>
							<Grid item xs={12}>
								<StyledTextField
									placeholder="Título"
									error={!errorTitle.isValid}
									helperText={errorTitle.helperText}
									value={title}
									onChange={(e) => {
										setTitle(e.target.value);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<StyledTextField
									placeholder="Descrição"
									error={!errorDescription.isValid}
									helperText={errorDescription.helperText}
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
				)}
				{context === 'delete' && (
					<DialogContentText paddingX={3} paddingY={1} id="alert-dialog-description">
						Tem certeza que deseja apagar este recado? Este recado não pode ser
						recuperado!
					</DialogContentText>
				)}
				<Divider />
				<DialogActions sx={{ padding: 3, justifyContent: 'space-between' }}>
					<StyledButton
						type="button"
						onClick={() => {
							setOpen(false);
							setErrorDescription({
								helperText: '',
								isValid: true,
							});
							setErrorTitle({
								helperText: '',
								isValid: true,
							});
						}}
						context="Modal">
						Cancelar
					</StyledButton>
					<StyledButton type="submit" context="Modal">
						Confirmar
					</StyledButton>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default ModalNotes;
