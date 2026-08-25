export const apiConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
	timeout: 60000,
	headers: {
		'X-App-Version': '1.0.0',
	},
};
