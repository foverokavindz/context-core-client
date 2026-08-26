import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const STATUS_ICON_SIZE = 32;

export type BannerTone = 'positive' | 'critical' | 'neutral';

function bannerTint(theme: import('@mui/material/styles').Theme, tone: BannerTone): string {
  if (tone === 'positive') return theme.tokens.positiveTint;
  if (tone === 'critical') return theme.tokens.criticalTint;
  return theme.tokens.surfaceInset;
}

function bannerAccent(theme: import('@mui/material/styles').Theme, tone: BannerTone): string {
  if (tone === 'positive') return theme.palette.success.main;
  if (tone === 'critical') return theme.palette.error.main;
  return theme.tokens.ink3;
}

export const StyledStatusBanner = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: BannerTone }>(({ theme, tone }) => ({
  alignItems: 'center',
  padding: theme.spacing(1.75, 2),
  borderRadius: theme.tokens.radius.lg,
  backgroundColor: bannerTint(theme, tone),
  minWidth: 0,
}));

export const StyledStatusIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: BannerTone }>(({ theme, tone }) => ({
  width: STATUS_ICON_SIZE,
  height: STATUS_ICON_SIZE,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: bannerAccent(theme, tone),
  color: theme.palette.common.white,
}));

export const StyledStatusTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.lg,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const StyledStatusCaption = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.sm,
  color: theme.tokens.ink2,
  lineHeight: 1.4,
}));

export const StyledPipelineBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.tokens.radius.lg,
  padding: theme.spacing(2),
  minWidth: 0,
}));

export const StyledPipelineBoxTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.md,
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1.75),
}));
