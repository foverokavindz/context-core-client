import Stack from '@mui/material/Stack';
import { Key } from 'lucide-react';
import type { SourceCatalogEntry } from '../../../../configs/datasource.configs';
import type { CredentialForm } from '../../datasources.types';
import {
  StyledSectionChip,
  StyledSectionHeading,
  StyledFieldGrid,
  StyledCredentialField,
} from './CredentialFields.section.styled.component';

const CHIP_ICON_SIZE = 12;

const TITLE_LABEL = 'Connection Name';

interface CredentialFieldsSectionProps {
  entry: SourceCatalogEntry;
  form: CredentialForm;
  onChangeTitle?: (title: string) => void;
  onChangeConfigField?: (key: string, value: string) => void;
  onChangeToken?: (token: string) => void;
  readOnly?: boolean;
  showHeading?: boolean;
}

function CredentialFieldsSection({
  entry,
  form,
  onChangeTitle,
  onChangeConfigField,
  onChangeToken,
  readOnly = false,
  showHeading = true,
}: CredentialFieldsSectionProps) {
  return (
    <Stack spacing={1.5} sx={{ minWidth: 0 }}>
      {showHeading && (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <StyledSectionChip>
            <Key size={CHIP_ICON_SIZE} />
          </StyledSectionChip>
          <StyledSectionHeading>Connection Details</StyledSectionHeading>
        </Stack>
      )}
      <StyledFieldGrid>
        <StyledCredentialField
          label={TITLE_LABEL}
          placeholder={entry.titlePlaceholder}
          required
          value={form.title}
          disabled={readOnly}
          onChange={(event) => onChangeTitle?.(event.target.value)}
        />
        {entry.fields.map((field) => (
          <StyledCredentialField
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            value={form.config[field.key] ?? ''}
            disabled={readOnly}
            onChange={(event) => onChangeConfigField?.(field.key, event.target.value)}
          />
        ))}
        <StyledCredentialField
          label={entry.tokenField.label}
          placeholder={entry.tokenField.placeholder}
          required={entry.tokenField.required}
          type="password"
          value={form.token}
          disabled={readOnly}
          onChange={(event) => onChangeToken?.(event.target.value)}
        />
      </StyledFieldGrid>
    </Stack>
  );
}

export default CredentialFieldsSection;
