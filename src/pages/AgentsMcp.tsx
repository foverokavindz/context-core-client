import PageShellLayout from '../layouts/PageShellLayout';
import PageTitleBar from '../components/PageTitleBar';
import ComingSoonPlaceholder from '../components/ComingSoonPlaceholder';

function AgentsMcp() {
	return (
		<PageShellLayout
			header={
				<PageTitleBar
					title="Agents / MCP"
					subtitle="Connect external AI agents securely to your organizational context."
				/>
			}
		>
			<ComingSoonPlaceholder label="Agents / MCP" />
		</PageShellLayout>
	);
}

export default AgentsMcp;
