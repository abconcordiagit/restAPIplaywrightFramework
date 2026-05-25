import { test, expect, APIRequestContext } from '@playwright/test';
import { APIClient } from '../utils/apiClient';
import postPayload from '../test-data/postPayload.json';

test.describe('JSONPlaceholder API Tests', () => {

    let apiContext: APIRequestContext;
    const apiClient = new APIClient();

    test.beforeAll(async () => {

        apiContext = await apiClient.createContext();
    });

    // GET Request
    test('GET all posts', async () => {

        const response = await apiContext.get('/posts');

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);

        expect(responseBody.length).toBeGreaterThan(0);
    });

    // GET Single Post
    test('GET single post', async () => {

        const response = await apiContext.get('/posts/1');

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);

        expect(responseBody.id).toBe(1);
    });

    // POST Request
    test('CREATE new post', async () => {

        const response = await apiContext.post('/posts', {

            data: postPayload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        console.log(responseBody);

        expect(responseBody.title)
            .toBe(postPayload.title);
    });

    // PUT Request
    test('UPDATE post', async () => {

        const updatedPayload = {

            id: 1,
            title: 'Updated Post',
            body: 'Updated API Testing',
            userId: 1
        };

        const response = await apiContext.put('/posts/1', {

            data: updatedPayload
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);

        expect(responseBody.title)
            .toBe('Updated Post');
    });

    // PATCH Request
    test('PATCH post title', async () => {

        const response = await apiContext.patch('/posts/1', {

            data: {
                title: 'Patched Title'
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);

        expect(responseBody.title)
            .toBe('Patched Title');
    });

    // DELETE Request
    test('DELETE post', async () => {

        const response = await apiContext.delete('/posts/1');

        expect(response.status()).toBe(200);
    });
});