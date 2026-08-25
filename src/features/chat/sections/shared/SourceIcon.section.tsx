import { createElement } from 'react';
import { useTheme } from '@mui/material/styles';
import { getSourceIcon } from '../../chat.constants';
import type { ChatSourceType } from '../../../../types/common.types';

interface SourceIconSectionProps {
  source: ChatSourceType;
  size: number;
}

function SourceIconSection({ source, size }: SourceIconSectionProps) {
  const theme = useTheme();
  return createElement(getSourceIcon(source), { size, color: theme.tokens.ink3 });
}

export default SourceIconSection;
