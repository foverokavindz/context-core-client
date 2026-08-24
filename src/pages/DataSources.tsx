import PageShellLayout from '../layouts/PageShellLayout';
import PageTitleBar from '../components/PageTitleBar';
import { DataSourcesProvider } from '../features/datasources/context/DataSources.context';
import DataSourcesPanel from '../features/datasources/panels/DataSources.panel';
import AddSourceButton from '../features/datasources/panels/AddSourceButton';

function DataSourcesLayout() {
	return (
		<PageShellLayout
			header={
				<PageTitleBar
					title="Data Sources"
					subtitle="Connect, sync and monitor the knowledge sources that power your context engine."
					actions={<AddSourceButton />}
				/>
			}
		>
			<DataSourcesPanel />
		</PageShellLayout>
	);
}

function DataSources() {
	return (
		<DataSourcesProvider>
			<DataSourcesLayout />
		</DataSourcesProvider>
	);
}

export default DataSources;
