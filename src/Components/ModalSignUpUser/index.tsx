import { Close } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showSnackBar } from '../../store/modules/SnackBar/snackBarSlice';
import { addUser, getUser } from '../../store/modules/Users/usersSlice';
import { IsValidCredentials } from '../../types/IsValidCredentials';
import { emailRegex } from '../../utils/validators/regexData';
import StyledButton from '../StyledButton';
import StyledTextField from '../StyledTextField';

interface ModalSignupUserProps {
	open: boolean;
	changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSignupUser: React.FC<ModalSignupUserProps> = ({ open, changeOpen }) => {
	const [emailRegister, setEmailRegister] = useState<string>('');
	const [passwordRegister, setPasswordRegister] = useState<string>('');
	const [confirmPasswordRegister, setConfirmPasswordRegister] = useState<string>('');

	const [errorEmail, setErrorEmail] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});
	const [errorPassword, setErrorPassword] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});
	const [errorConfirmPassword, setErrorConfirmPassword] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const dispatch = useAppDispatch();
	const userList = useAppSelector(getUser);

	useEffect(() => {
		if (emailRegister.length && !emailRegex.test(emailRegister)) {
			setErrorEmail({
				helperText: 'Informe um e-mail válido.',
				isValid: false,
			});
		} else {
			setErrorEmail({
				helperText: 'Utilize seu e-mail para criar uma conta.',
				isValid: true,
			});
		}
	}, [emailRegister]);

	useEffect(() => {
		if (passwordRegister.length && passwordRegister.length < 6) {
			setErrorPassword({
				helperText: 'Cadastre uma senha com no mínimo 6 caracteres.',
				isValid: false,
			});
		} else {
			setErrorPassword({
				helperText: 'Utilize uma senha fácil de lembrar e anote para não esquecer.',
				isValid: true,
			});
		}
	}, [passwordRegister]);

	useEffect(() => {
		if (confirmPasswordRegister.length && confirmPasswordRegister !== passwordRegister) {
			setErrorConfirmPassword({
				helperText: 'Senhas não conferem',
				isValid: false,
			});
		} else {
			setErrorConfirmPassword({
				helperText: '',
				isValid: true,
			});
		}
	}, [confirmPasswordRegister, passwordRegister]);

	const handleClose = () => {
		changeOpen(false);
		setEmailRegister('');
		setPasswordRegister('');
		setConfirmPasswordRegister('');
	};

	const verifyUserExists = () => {
		const user = userList.find((user) => {
			return user.email === emailRegister;
		});
		if (user) {
			return true;
		}
	};

	const handleSignupUser = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		if (verifyUserExists()) {
			dispatch(showSnackBar('Usuário já existente!'));
			return;
		}

		if (
			!errorEmail.isValid ||
			!errorPassword.isValid ||
			!errorConfirmPassword.isValid ||
			!emailRegister ||
			!passwordRegister ||
			!confirmPasswordRegister
		) {
			dispatch(showSnackBar('Erro ao realizar o cadastro!'));
			return;
		}

		dispatch(
			addUser({
				email: emailRegister,
				password: passwordRegister,
			}),
		);

		setEmailRegister('');
		setPasswordRegister('');
		setConfirmPasswordRegister('');

		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
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
				{'Crie sua conta!'}

				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
					}}>
					<Close />
				</IconButton>
			</DialogTitle>

			<Divider />
			<Box component="form" onSubmit={handleSignupUser}>
				<DialogContent sx={{ marginY: 2 }}>
					<Grid container>
						<Grid item xs={12}>
							<StyledTextField
								placeholder="E-mail"
								error={!errorEmail.isValid}
								helperText={errorEmail.helperText}
								onChange={(event) => {
									setEmailRegister(event.currentTarget.value);
								}}
								value={emailRegister}
							/>
						</Grid>
						<Grid item xs={12}>
							<StyledTextField
								placeholder="Senha"
								error={!errorPassword.isValid}
								helperText={errorPassword.helperText}
								type="password"
								onChange={(event) => {
									setPasswordRegister(event.currentTarget.value);
								}}
								value={passwordRegister}
							/>
							<StyledTextField
								placeholder="Confirmar Senha"
								error={!errorConfirmPassword.isValid}
								helperText={errorConfirmPassword.helperText}
								type="password"
								onChange={(event) => {
									setConfirmPasswordRegister(event.currentTarget.value);
								}}
								value={confirmPasswordRegister}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />

				<DialogActions sx={{ padding: 3, justifyContent: 'space-between' }}>
					<StyledButton type="button" onClick={handleClose} context="Modal">
						Cancelar
					</StyledButton>
					<StyledButton type="submit" context="Modal">
						Cadastrar
					</StyledButton>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default ModalSignupUser;
