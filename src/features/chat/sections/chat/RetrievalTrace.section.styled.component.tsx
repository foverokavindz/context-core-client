import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const STEP_SOURCE_WIDTH = 108;
const STEP_COUNT_WIDTH = 62;

export const StyledTraceBody = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.75),
}));

export const StyledSummaryLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize['3xs'],
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: theme.spacing(0.375),
}));

export const StyledSummaryValue = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.md,
  color: theme.palette.text.primary,
  lineHeight: 1.55,
}));

export const StyledTraceChipRow = styled(Stack)(({ theme }) => ({
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
}));

export const StyledTraceChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: 'neutral' | 'positive' | 'muted' }>(({ theme, tone }) => ({
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(0.375),
  borderRadius: 999,
  fontSize: theme.tokens.fontSize['2xs'],
  fontWeight: theme.typography.fontWeightMedium,
  backgroundColor:
    tone === 'positive' ? theme.tokens.positiveTint : tone === 'muted' ? theme.tokens.surfaceSunken : theme.tokens.accentTint,
  color: tone === 'positive' ? theme.palette.success.dark : tone === 'muted' ? theme.palette.text.secondary : theme.palette.accent.dark,
}));

export const StyledStepsTable = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.tokens.radius.md,
  overflow: 'hidden',
}));

export const StyledStepHeaderRow = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.tokens.surfaceSunken,
  paddingInline: theme.spacing(1.5),
  paddingBlock: theme.spacing(1),
  gap: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledStepRow = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'divided',
})<{ divided: boolean }>(({ theme, divided }) => ({
  paddingInline: theme.spacing(1.5),
  paddingBlock: theme.spacing(1.25),
  gap: theme.spacing(1.5),
  alignItems: 'flex-start',
  borderBottom: divided ? `1px solid ${theme.palette.divider}` : 'none',
}));

const StyledStepHeaderCell = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize['3xs'],
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}));

export const StyledStepHeaderSource = styled(StyledStepHeaderCell)({
  width: STEP_SOURCE_WIDTH,
  flexShrink: 0,
});

export const StyledStepHeaderStep = styled(StyledStepHeaderCell)({
  flex: 1,
  minWidth: 0,
});

export const StyledStepHeaderCount = styled(StyledStepHeaderCell)({
  width: STEP_COUNT_WIDTH,
  flexShrink: 0,
  textAlign: 'right',
});

export const StyledStepSourceCell = styled(Stack)(({ theme }) => ({
  width: STEP_SOURCE_WIDTH,
  flexShrink: 0,
  alignItems: 'center',
  gap: theme.spacing(0.75),
  fontSize: theme.tokens.fontSize.sm,
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const StyledStepDetailCell = styled(Stack)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  gap: theme.spacing(0.375),
}));

export const StyledStepGoal = styled(Typography)(({ theme }) => ({
  fontSize: theme.tokens.fontSize.md,
  color: theme.palette.text.primary,
  lineHeight: 1.5,
}));

export const StyledStepQuery = styled(Typography)(({ theme }) => ({
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  fontSize: theme.tokens.fontSize.xs,
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const StyledStepCountCell = styled(Typography)(({ theme }) => ({
  width: STEP_COUNT_WIDTH,
  flexShrink: 0,
  textAlign: 'right',
  fontSize: theme.tokens.fontSize.sm,
  color: theme.palette.text.secondary,
}));
