import { TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface TextFieldProps {
	placeholder: string;
	value: string;
	required: boolean;
	helperText?: string;
	error?: boolean;
	type?: string;
	inputProps?: {
		minLength: number;
	};
	onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const StyledTextField: React.FC<TextFieldProps> = ({
	placeholder,
	value,
	required,
	helperText,
	error,
	type,
	inputProps,
	onChange,
}) => {
	return (
		<TextField
			variant="standard"
			placeholder={placeholder}
			helperText={helperText}
			required={required}
			error={error}
			value={value}
			type={type}
			inputProps={inputProps}
			onChange={onChange}
			sx={{
				outline: '0',
				borderRadius: '20px',
				padding: '15px',
				backgroundColor: '#ffffff17',
				border: 'none',
				marginBottom: '36px',
				boxShadow: 'inset 2px 2px 5px #babecc50, inset -5px -5px 5px #ffffff50',
				width: '100%',
				transition: '0.2s ease-in-out',
				color: '#ffffff',
				'&:hover': {
					boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff',
				},
			}}
		/>
	);
};

export default StyledTextField;
