import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const TILE_MIN_WIDTH = 150;

export const StyledStatsGrid = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(auto-fit, minmax(${TILE_MIN_WIDTH}px, 1fr))`,
	gap: theme.spacing(1.75),
	minWidth: 0,
}));
