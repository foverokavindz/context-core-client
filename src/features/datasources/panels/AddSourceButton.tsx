import { Plus } from 'lucide-react';
import { useDataSourcesContext } from '../context/DataSources.context';
import { StyledAddSourceButton } from './AddSourceButton.styled.component';

const ICON_SIZE = 15;

function AddSourceButton() {
  const { openWizard } = useDataSourcesContext();

  return (
    <StyledAddSourceButton onClick={() => openWizard()} startIcon={<Plus size={ICON_SIZE} />}>
      Add New Source
    </StyledAddSourceButton>
  );
}

export default AddSourceButton;
