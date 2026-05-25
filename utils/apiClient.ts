import { request, APIRequestContext } from '@playwright/test';

export class APIClient {

    async createContext(): Promise<APIRequestContext> {

        return await request.newContext({

            baseURL: process.env.BASE_URL,

            extraHTTPHeaders: {
                'Content-Type': 'application/json'
            }
        });
    }
}