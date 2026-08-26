import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { RunStatus } from '../../datasources.types';

export const StyledRunRow = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'divided',
})<{ divided: boolean }>(({ theme, divided }) => ({
  alignItems: 'center',
  minWidth: 0,
  padding: theme.spacing(1.375, 0),
  borderBottom: divided ? `1px solid ${theme.palette.divider}` : 'none',
}));

export const StyledRunStarted = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.md,
  color: theme.palette.text.primary,
}));

export const StyledRunMeta = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize['2xs'],
  color: theme.tokens.ink3,
}));

function pillTint(theme: import('@mui/material/styles').Theme, status: RunStatus): string {
  if (status === 'completed') return theme.tokens.positiveTint;
  if (status === 'failed') return theme.tokens.criticalTint;
  if (status === 'running') return theme.tokens.warningTint;
  return theme.tokens.surfaceInset;
}

function pillInk(theme: import('@mui/material/styles').Theme, status: RunStatus): string {
  if (status === 'completed') return theme.palette.success.dark;
  if (status === 'failed') return theme.palette.error.main;
  if (status === 'running') return theme.palette.warning.dark;
  return theme.tokens.ink3;
}

export const StyledRunStatusPill = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: RunStatus }>(({ theme, status }) => ({
  flexShrink: 0,
  padding: theme.spacing(0.25, 1),
  borderRadius: theme.tokens.radius.sm,
  fontSize: theme.tokens.fontSize['2xs'],
  fontWeight: 500,
  backgroundColor: pillTint(theme, status),
  color: pillInk(theme, status),
}));
