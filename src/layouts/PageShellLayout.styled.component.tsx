import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledPageShellRoot = styled(Box)(({ theme }) => ({
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	padding: theme.spacing(3),
	paddingBottom: 0,
}));

export const StyledPageShellBody = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	overflowY: 'auto',
	paddingBottom: theme.spacing(5),
	paddingRight: theme.spacing(1),
}));
