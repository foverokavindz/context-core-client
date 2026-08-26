import { Check } from 'lucide-react';
import type { SourceCatalogEntry } from '../../../../configs/datasource.configs';
import type { SourceTypeType } from '../../../../types/common.types';
import {
  StyledCatalogGrid,
  StyledCatalogCard,
  StyledCatalogIconChip,
  StyledCatalogName,
  StyledCatalogDescription,
  StyledCatalogBadge,
} from './SelectSource.section.styled.component';

const APP_ICON_SIZE = 17;
const BADGE_ICON_SIZE = 11;

interface SelectSourceSectionProps {
  catalog: SourceCatalogEntry[];
  selectedSourceType: SourceTypeType | null;
  onPick: (sourceType: SourceTypeType) => void;
}

function SelectSourceSection({ catalog, selectedSourceType, onPick }: SelectSourceSectionProps) {
  return (
    <StyledCatalogGrid>
      {catalog.map((entry) => {
        const AppIcon = entry.icon;
        const selected = entry.sourceType === selectedSourceType;

        return (
          <StyledCatalogCard
            key={entry.sourceType}
            selected={selected}
            onClick={() => onPick(entry.sourceType)}
          >
            <StyledCatalogIconChip>
              <AppIcon size={APP_ICON_SIZE} />
            </StyledCatalogIconChip>
            <StyledCatalogName>{entry.name}</StyledCatalogName>
            <StyledCatalogDescription>{entry.description}</StyledCatalogDescription>
            {selected && (
              <StyledCatalogBadge>
                <Check size={BADGE_ICON_SIZE} />
              </StyledCatalogBadge>
            )}
          </StyledCatalogCard>
        );
      })}
    </StyledCatalogGrid>
  );
}

export default SelectSourceSection;
