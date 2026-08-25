import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  StyledCollapsibleRoot,
  StyledCollapsibleToggle,
  StyledCollapsibleLabel,
  StyledCollapsibleCount,
  StyledCollapsibleBody,
} from './CollapsiblePanel.section.styled.component';

const CHEVRON_SIZE = 15;

interface CollapsiblePanelSectionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

function CollapsiblePanelSection({ title, count, defaultOpen = false, children }: CollapsiblePanelSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <StyledCollapsibleRoot>
      <StyledCollapsibleToggle onClick={() => setOpen((isOpen) => !isOpen)}>
        <StyledCollapsibleLabel direction="row">
          <span>{title}</span>
          {count !== undefined && <StyledCollapsibleCount>{count}</StyledCollapsibleCount>}
        </StyledCollapsibleLabel>
        {open ? <ChevronUp size={CHEVRON_SIZE} /> : <ChevronDown size={CHEVRON_SIZE} />}
      </StyledCollapsibleToggle>
      {open && <StyledCollapsibleBody>{children}</StyledCollapsibleBody>}
    </StyledCollapsibleRoot>
  );
}

export default CollapsiblePanelSection;
