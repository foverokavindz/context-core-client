import type { IApiClient } from '../api/IApiClient';
import { getApiClient } from '../api/AxiosClient';
import type { ApiResponse } from '../types/api.types';
import type { CreateIngestion, DataSourceDetail, DataSourceStats, DataSourceSummary, IndexedResource, IngestStarted, SyncRun } from '../types/dataSource.types';

export class DataSourceService {
	private api: IApiClient;

	constructor(api: IApiClient) {
		this.api = api;
	}

	public async StartIngestion(sourceSlug: string, dto: CreateIngestion): Promise<ApiResponse<IngestStarted>> {
		return await this.api.post<IngestStarted>(`/v1/ingestData/${sourceSlug}`, dto);
	}

	public async GetDataSourcesByTeam(teamId: string): Promise<ApiResponse<DataSourceSummary[]>> {
		return await this.api.get<DataSourceSummary[]>(`/v1/dataSources?team_id=${teamId}`);
	}

	public async GetDataSourceById(dataSourceId: string): Promise<ApiResponse<DataSourceDetail>> {
		return await this.api.get<DataSourceDetail>(`/v1/dataSources/${dataSourceId}`);
	}

	public async GetSyncRunById(syncRunId: string): Promise<ApiResponse<SyncRun>> {
		return await this.api.get<SyncRun>(`/v1/syncRuns/${syncRunId}`);
	}

	public async GetSyncRunsBySource(dataSourceId: string): Promise<ApiResponse<SyncRun[]>> {
		return await this.api.get<SyncRun[]>(`/v1/dataSources/${dataSourceId}/syncRuns`);
	}

	public async GetIndexedResources(dataSourceId: string): Promise<ApiResponse<IndexedResource[]>> {
		return await this.api.get<IndexedResource[]>(`/v1/dataSources/${dataSourceId}/resources`);
	}

	public async GetDataSourceStats(teamId: string): Promise<ApiResponse<DataSourceStats>> {
		return await this.api.get<DataSourceStats>(`/v1/dataSources/stats?team_id=${teamId}`);
	}
}

export const dataSourceService = new DataSourceService(getApiClient());
