import PageShellLayout from '../layouts/PageShellLayout';
import PageTitleBar from '../components/PageTitleBar';
import ComingSoonPlaceholder from '../components/ComingSoonPlaceholder';

function Documents() {
	return (
		<PageShellLayout
			header={
				<PageTitleBar
					title="Documents"
					subtitle="Manage internal documents available to your organization's knowledge system."
				/>
			}
		>
			<ComingSoonPlaceholder label="Documents" />
		</PageShellLayout>
	);
}

export default Documents;
