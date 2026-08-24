import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const MAIN_COLUMN_BASIS = 420;
const RAIL_COLUMN_BASIS = 260;
const RAIL_MAX_WIDTH = 340;

export const StyledDataSourcesRoot = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	flexWrap: 'wrap',
	alignItems: 'flex-start',
	gap: theme.spacing(2.5),
	minWidth: 0,
}));

export const StyledMainColumn = styled(Stack)(({ theme }) => ({
	flex: `3 1 ${MAIN_COLUMN_BASIS}px`,
	gap: theme.spacing(2.5),
	minWidth: 0,
}));

export const StyledRailColumn = styled(Stack)(({ theme }) => ({
	flex: `1 1 ${RAIL_COLUMN_BASIS}px`,
	maxWidth: RAIL_MAX_WIDTH,
	gap: theme.spacing(2.5),
	minWidth: 0,
}));
