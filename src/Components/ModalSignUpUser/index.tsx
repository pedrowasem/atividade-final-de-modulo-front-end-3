import { Close } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { adicionarUsuario } from '../../store/modules/Users/usersSlice';
import { IsValidCredentials } from '../../types/IsValidCredentials';
import { emailRegex } from '../../utils/validators/regexData';
import StyledButton from '../StyledButton';
import StyledTextField from '../StyledTextField';

interface ModalSignupUserProps {
	aberto: boolean;
	mudarAberto: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSignupUser: React.FC<ModalSignupUserProps> = ({ aberto, mudarAberto }) => {
	// estados criados para controlar o que é digitado nos inputs
	const [emailCadastro, setEmailCadastro] = useState<string>('');
	const [senhaCadastro, setSenhaCadastro] = useState<string>('');

	// estados criados para validação do que contem nos estados acima
	const [errorEmail, setErrorEmail] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});
	const [errorSenha, setErrorSenha] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	// constroi um disparador de ações para modificar os dados da store
	const dispatch = useAppDispatch();

	// executa a callback sempre que o valor do estado é alterado
	useEffect(() => {
		if (emailCadastro.length && !emailRegex.test(emailCadastro)) {
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
	}, [emailCadastro]);

	// executa a callback sempre que o valor do estado é alterado
	useEffect(() => {
		if (senhaCadastro.length && senhaCadastro.length < 6) {
			setErrorSenha({
				helperText: 'Cadastre uma senha com no mínimo 6 caracteres.',
				isValid: false,
			});
		} else {
			setErrorSenha({
				helperText: 'Utilize uma senha fácil de lembrar e anote para não esquecer.',
				isValid: true,
			});
		}
	}, [senhaCadastro]);

	// lógica para fechar o modal - executa ao clique do botão
	const handleClose = () => {
		mudarAberto(false);
	};

	const handleSignupUser = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		// cadastrar um usuario no ESTADO GLOBAL
		dispatch(
			adicionarUsuario({
				email: emailCadastro,
				senha: senhaCadastro,
			}),
		);

		// limpar os campos de input
		setEmailCadastro('');
		setSenhaCadastro('');

		// fechar o modal
		handleClose();
	};

	return (
		<Dialog
			open={aberto}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				sx: {
					borderRadius: '20px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
					backgroundImage: '',
					backgroundColor: '#090909aa',
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
								type="email"
								error={!errorEmail.isValid}
								helperText={errorEmail.helperText}
								onChange={(event) => {
									setEmailCadastro(event.currentTarget.value);
								}}
								required
								value={emailCadastro}
							/>
						</Grid>
						<Grid item xs={12}>
							<StyledTextField
								placeholder="Senha"
								error={!errorSenha.isValid}
								helperText={errorSenha.helperText}
								type="password"
								onChange={(event) => {
									setSenhaCadastro(event.currentTarget.value);
								}}
								required
								inputProps={{ minLength: 6 }}
								value={senhaCadastro}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />

				<DialogActions sx={{ padding: 3, justifyContent: 'space-between' }}>
					<StyledButton type="button" onClick={handleClose} context="Modal">
						Cancelar
					</StyledButton>
					<StyledButton
						// disabled={!errorEmail.isValid || !errorSenha.isValid}
						type="submit"
						context="Modal">
						Cadastrar
					</StyledButton>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default ModalSignupUser;
