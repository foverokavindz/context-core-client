import Stack from '@mui/material/Stack';
import SourceIconSection from '../shared/SourceIcon.section';
import CollapsiblePanelSection from '../shared/CollapsiblePanel.section';
import { getSourceLabel } from '../../chat.constants';
import type { ChatRetrieval } from '../../../../types/chat.types';
import {
  StyledTraceBody,
  StyledSummaryLabel,
  StyledSummaryValue,
  StyledTraceChipRow,
  StyledTraceChip,
  StyledStepsTable,
  StyledStepHeaderRow,
  StyledStepRow,
  StyledStepHeaderSource,
  StyledStepHeaderStep,
  StyledStepHeaderCount,
  StyledStepSourceCell,
  StyledStepDetailCell,
  StyledStepGoal,
  StyledStepQuery,
  StyledStepCountCell,
} from './RetrievalTrace.section.styled.component';

const STEP_ICON_SIZE = 13;

interface RetrievalTraceSectionProps {
  retrieval: ChatRetrieval | null;
}

function RetrievalTraceSection({ retrieval }: RetrievalTraceSectionProps) {
  if (!retrieval) return null;

  return (
    <CollapsiblePanelSection title="Retrieval Trace">
      <StyledTraceBody>
          <StyledTraceChipRow direction="row">
            <StyledTraceChip tone="neutral">{retrieval.intent}</StyledTraceChip>
            <StyledTraceChip tone={retrieval.retrieval_required ? 'positive' : 'muted'}>
              {retrieval.retrieval_required ? 'Retrieval required' : 'No retrieval required'}
            </StyledTraceChip>
          </StyledTraceChipRow>

          <Stack>
            <StyledSummaryLabel>Resolved query</StyledSummaryLabel>
            <StyledSummaryValue>{retrieval.resolved_query}</StyledSummaryValue>
          </Stack>

          <Stack>
            <StyledSummaryLabel>Plan goal</StyledSummaryLabel>
            <StyledSummaryValue>{retrieval.plan_goal}</StyledSummaryValue>
          </Stack>

          {retrieval.steps.length > 0 && (
            <StyledStepsTable>
              <StyledStepHeaderRow direction="row">
                <StyledStepHeaderSource>Source</StyledStepHeaderSource>
                <StyledStepHeaderStep>Step</StyledStepHeaderStep>
                <StyledStepHeaderCount>Results</StyledStepHeaderCount>
              </StyledStepHeaderRow>
              {retrieval.steps.map((step, index) => (
                <StyledStepRow key={step.step_id} direction="row" divided={index < retrieval.steps.length - 1}>
                  <StyledStepSourceCell direction="row">
                    <SourceIconSection source={step.source} size={STEP_ICON_SIZE} />
                    <span>{getSourceLabel(step.source)}</span>
                  </StyledStepSourceCell>
                  <StyledStepDetailCell>
                    <StyledStepGoal>{step.goal}</StyledStepGoal>
                    <StyledStepQuery title={step.executed_query}>{step.executed_query}</StyledStepQuery>
                  </StyledStepDetailCell>
                  <StyledStepCountCell>{step.result_count}</StyledStepCountCell>
                </StyledStepRow>
              ))}
            </StyledStepsTable>
          )}
      </StyledTraceBody>
    </CollapsiblePanelSection>
  );
}

export default RetrievalTraceSection;
