const request = require('supertest');
const app = require('../../src/app');

describe('GET /', () => {
    it('should return 200 OK and the welcome message', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, World!');
    });
});