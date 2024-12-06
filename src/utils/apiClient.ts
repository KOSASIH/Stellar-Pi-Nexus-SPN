import axios from 'axios';

export class ApiClient {
    private static instance: ApiClient;

    private constructor() {}

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    public async get(url: string, params?: any) {
        try {
            const response = await axios.get(url, { params });
            return response.data;
        } catch (error) {
            throw new Error(`API GET request failed: ${error.message}`);
        }
    }

    public async post(url: string, data: any) {
        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            throw new Error(`API POST request failed: ${error.message}`);
        }
    }
}
