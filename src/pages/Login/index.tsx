import { Box, Checkbox, FormControlLabel, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../Components/Loading';
import ModalSignupUser from '../../Components/ModalSignUpUser';
import { SnackBarComp } from '../../Components/SnackBar';
import StyledButton from '../../Components/StyledButton';
import StyledTextField from '../../Components/StyledTextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideLoading, showLoading } from '../../store/modules/Loading/loadingSlice';
import { showSnackBar } from '../../store/modules/SnackBar/snackBarSlice';
import { getUser } from '../../store/modules/Users/usersSlice';
import { IsValidCredentials } from '../../types/IsValidCredentials';
import { emailRegex } from '../../utils/validators/regexData';

const Login: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState('');
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [emailIsValid, setEmailIsValid] = useState<IsValidCredentials>({
		helperText: '',
		isValid: false,
	});

	const navigate = useNavigate();
	const select = useAppSelector(getUser);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (email.length && !emailRegex.test(email)) {
			setEmailIsValid({
				helperText: 'Email inválido',
				isValid: false,
			});
			return;
		}

		setEmailIsValid({
			helperText: 'Utilize seu e-mail para realizar o login.',
			isValid: true,
		});
	}, [email]);

	useEffect(() => {
		if (localStorage.getItem('userLogged') || sessionStorage.getItem('userLogged')) {
			navigate('/home');
		}
	}, [navigate]);

	const loggedUser = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
		setIsLogged(checked);
	};

	const handleClickOpenModal = () => {
		setIsOpen(true);
	};

	const verifyUserExists = () => {
		const user = select.find((user) => {
			return user.email === email && user.password === password;
		});

		if (!user) {
			dispatch(showSnackBar('Erro ao realizar o login'));

			return;
		}

		isLogged
			? localStorage.setItem('userLogged', user.email)
			: sessionStorage.setItem('userLogged', user.email);

		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
			navigate('/home');
		}, 3000);
	};

	useEffect(() => {
		if (email.length && !emailRegex.test(email)) {
			setEmailIsValid({
				helperText: 'Email inválido',
				isValid: false,
			});
			return;
		}

		if (email.length && emailRegex.test(email)) {
			setEmailIsValid({
				helperText: 'E-mail válido!',
				isValid: true,
			});
			return;
		}
		setEmailIsValid({
			helperText: 'Utilize seu e-mail para realizar o login.',
			isValid: true,
		});
	}, [email]);

	return (
		<>
			<Box
				component={'form'}
				sx={{ maxWidth: '80%', margin: 'auto' }}
				onSubmit={(event) => {
					event.preventDefault();

					if (!emailIsValid.isValid || email.length === 0) {
						dispatch(showSnackBar('Erro ao realizar o login'));
						return;
					}
					verifyUserExists();
				}}>
				<Grid
					container
					sx={{
						alignItems: 'center',
						justifyContent: 'space-around',
						height: '93vh',
					}}>
					<Grid item>
						<Typography variant="h1">NoteHub</Typography>
					</Grid>
					<Grid
						item
						sx={{
							flexDirection: 'column',
							display: 'flex',
							width: '400px',
							height: 'auto',
							padding: '40px',
							borderRadius: '20px',
							boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
						}}>
						<Typography variant="h5" sx={{ marginBottom: '18px', textAlign: 'center' }}>
							Login
						</Typography>
						<StyledTextField
							placeholder="E-mail"
							error={!emailIsValid.isValid}
							helperText={emailIsValid.helperText}
							value={email}
							onChange={(event) => {
								setEmail(event.currentTarget.value);
							}}
						/>
						<StyledTextField
							placeholder="Senha"
							value={password}
							onChange={(event) => {
								setPassword(event.currentTarget.value);
							}}
							type="password"
						/>
						<StyledButton type="submit" context="Login">
							Entrar
						</StyledButton>
						<FormControlLabel
							control={<Checkbox />}
							label="Permanecer logado?"
							onChange={loggedUser}
							value={isLogged}
						/>
						<Typography variant={'caption'} sx={{ fontSize: '14px' }}>
							Ainda não tem conta?{' '}
							<Link
								color="secondary"
								component={'button'}
								type="button"
								sx={{ textDecoration: 'underline' }}
								onClick={handleClickOpenModal}>
								Criar uma!
							</Link>
						</Typography>
						<SnackBarComp />
					</Grid>
				</Grid>
			</Box>
			<ModalSignupUser open={isOpen} changeOpen={setIsOpen} />
			<Loading />
		</>
	);
};

export default Login;
