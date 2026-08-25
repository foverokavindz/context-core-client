import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import SourceIconSection from '../shared/SourceIcon.section';
import CollapsiblePanelSection from '../shared/CollapsiblePanel.section';
import { getSourceLabel } from '../../chat.constants';
import type { ChatSource } from '../../../../types/chat.types';
import {
  StyledCitationPillRow,
  StyledCitationPill,
  StyledCitationSource,
  StyledCitationTitle,
  StyledCitationDetail,
  StyledDetailKicker,
  StyledDetailTitle,
  StyledDetailMetaRow,
  StyledDetailMetaLabel,
  StyledDetailMetaValue,
  StyledDetailSnippet,
} from './Citations.section.styled.component';

const PILL_ICON_SIZE = 13;
const DETAIL_ICON_SIZE = 14;
const PERCENT = 100;

const POPOVER_ANCHOR = { vertical: 'bottom', horizontal: 'left' } as const;
const POPOVER_TRANSFORM = { vertical: 'top', horizontal: 'left' } as const;

interface CitationsSectionProps {
  sources: ChatSource[];
}

function citationTitle(source: ChatSource): string {
  return source.resource_title ?? source.external_id;
}

function CitationDetail({ source }: { source: ChatSource }) {
  return (
    <StyledCitationDetail>
      <StyledDetailKicker direction="row">
        <SourceIconSection source={source.source} size={DETAIL_ICON_SIZE} />
        <span>
          {getSourceLabel(source.source)} · {source.resource_type}
        </span>
      </StyledDetailKicker>

      <StyledDetailTitle>{citationTitle(source)}</StyledDetailTitle>

      <StyledDetailMetaRow direction="row">
        <Stack>
          <StyledDetailMetaLabel>Identifier</StyledDetailMetaLabel>
          <StyledDetailMetaValue>{source.external_id}</StyledDetailMetaValue>
        </Stack>
        <Stack>
          <StyledDetailMetaLabel>Relevance</StyledDetailMetaLabel>
          <StyledDetailMetaValue>{Math.round(source.score * PERCENT)}%</StyledDetailMetaValue>
        </Stack>
      </StyledDetailMetaRow>

      <StyledDetailSnippet>{source.snippet}</StyledDetailSnippet>
    </StyledCitationDetail>
  );
}

function CitationsSection({ sources }: CitationsSectionProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeChunkId, setActiveChunkId] = useState<string | null>(null);

  if (sources.length === 0) return null;

  const activeSource = sources.find((source) => source.chunk_id === activeChunkId) ?? null;

  const closeDetail = () => {
    setAnchorEl(null);
    setActiveChunkId(null);
  };

  return (
    <CollapsiblePanelSection title="Citations" count={sources.length}>
      <StyledCitationPillRow direction="row">
        {sources.map((source) => (
          <StyledCitationPill
            key={source.chunk_id}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
              setActiveChunkId(source.chunk_id);
            }}
          >
            <SourceIconSection source={source.source} size={PILL_ICON_SIZE} />
            <StyledCitationSource component="span">{getSourceLabel(source.source)}</StyledCitationSource>
            <StyledCitationTitle component="span">{citationTitle(source)}</StyledCitationTitle>
          </StyledCitationPill>
        ))}
      </StyledCitationPillRow>

      <Popover
        open={Boolean(anchorEl && activeSource)}
        anchorEl={anchorEl}
        onClose={closeDetail}
        anchorOrigin={POPOVER_ANCHOR}
        transformOrigin={POPOVER_TRANSFORM}
      >
        {activeSource && <CitationDetail source={activeSource} />}
      </Popover>
    </CollapsiblePanelSection>
  );
}

export default CitationsSection;
