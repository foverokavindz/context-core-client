import { useEffect, useState } from 'react';
import { dataSourceService } from '../../services/DataSource.service';
import { CURRENT_USER } from '../../configs/user.configs';
import type { DataSourceStats } from '../../types/dataSource.types';
import { useDataSourcesContext } from './context/DataSources.context';

const STATS_ERROR = 'Could not load source stats.';

interface SourceStatsState {
	stats: DataSourceStats | null;
	loading: boolean;
	error: string | null;
}

export function useSourceStats(): SourceStatsState {
	const { statsVersion } = useDataSourcesContext();

	const [stats, setStats] = useState<DataSourceStats | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;

		const fetchStats = async () => {
			setError(null);
			setLoading(true);
			const response = await dataSourceService.GetDataSourceStats(CURRENT_USER.teamId);
			if (!active) return;

			if (response.success && response.data) {
				setStats(response.data);
			} else {
				console.error('Get Data Source Stats Error:', response.message);
				setStats(null);
				setError(response.error ?? response.message ?? STATS_ERROR);
			}
			setLoading(false);
		};

		fetchStats();

		return () => {
			active = false;
		};
	}, [statsVersion]);

	return { stats, loading, error };
}
