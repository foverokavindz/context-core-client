import PageShellLayout from '../layouts/PageShellLayout';
import PageTitleBar from '../components/PageTitleBar';
import ComingSoonPlaceholder from '../components/ComingSoonPlaceholder';

function DataSources() {
	return (
		<PageShellLayout
			header={
				<PageTitleBar
					title="Data Sources"
					subtitle="Connect, sync and monitor the knowledge sources that power your context engine."
				/>
			}
		>
			<ComingSoonPlaceholder label="Data Sources" />
		</PageShellLayout>
	);
}

export default DataSources;
