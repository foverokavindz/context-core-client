import { Check } from 'lucide-react';
import type { CatalogApp } from '../../datasources.types';
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
  catalog: CatalogApp[];
  selectedKey: string | null;
  onPick: (key: string) => void;
}

function SelectSourceSection({ catalog, selectedKey, onPick }: SelectSourceSectionProps) {
  return (
    <StyledCatalogGrid>
      {catalog.map((app) => {
        const AppIcon = app.icon;
        const selected = app.key === selectedKey;

        return (
          <StyledCatalogCard key={app.key} selected={selected} onClick={() => onPick(app.key)}>
            <StyledCatalogIconChip>
              <AppIcon size={APP_ICON_SIZE} />
            </StyledCatalogIconChip>
            <StyledCatalogName>{app.name}</StyledCatalogName>
            <StyledCatalogDescription>{app.description}</StyledCatalogDescription>
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
