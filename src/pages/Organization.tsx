import PageShellLayout from '../layouts/PageShellLayout';
import PageTitleBar from '../components/PageTitleBar';
import ComingSoonPlaceholder from '../components/ComingSoonPlaceholder';

function Organization() {
	return (
		<PageShellLayout
			header={
				<PageTitleBar
					title="Organization"
					subtitle="Manage your workspace, people, teams and departments."
				/>
			}
		>
			<ComingSoonPlaceholder label="Organization" />
		</PageShellLayout>
	);
}

export default Organization;
