import { Check } from 'lucide-react';
import type { ScopeItem } from '../../datasources.types';
import {
	StyledScopeList,
	StyledScopeRow,
	StyledScopeCheckbox,
	StyledScopeLabel,
} from './ScopeList.section.styled.component';

const CHECK_ICON_SIZE = 12;

interface ScopeListSectionProps {
	items: ScopeItem[];
	onToggle: (name: string) => void;
	/** The wizard frames the list in a box; the drawer sits it flush inside a card. */
	bordered?: boolean;
}

function ScopeListSection({ items, onToggle, bordered = false }: ScopeListSectionProps) {
	return (
		<StyledScopeList bordered={bordered}>
			{items.map((item) => (
				<StyledScopeRow key={item.name} onClick={() => onToggle(item.name)}>
					<StyledScopeCheckbox selected={item.selected}>
						{item.selected && <Check size={CHECK_ICON_SIZE} />}
					</StyledScopeCheckbox>
					<StyledScopeLabel>{item.name}</StyledScopeLabel>
				</StyledScopeRow>
			))}
		</StyledScopeList>
	);
}

export default ScopeListSection;
