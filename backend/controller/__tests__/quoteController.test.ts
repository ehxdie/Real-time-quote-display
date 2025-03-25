import request from 'supertest';
import express, { Express } from 'express';
import { getQuoteBySymbol } from '../quoteController';
import http from 'http';

const app: Express = express();
let server: http.Server;

// Add proper middleware
app.use(express.json());

// Ensure Content-Type middleware is set correctly
app.use((req, res, next) => {
    res.type('application/json'); // This sets the Content-Type to application/json
    next();
});

// Add route
app.get('/api/quote/:symbol?', getQuoteBySymbol);

describe('QuoteController', () => {
    beforeAll((done) => {
        server = app.listen(0, () => done());
    });

    afterAll((done) => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });

    describe('GET /api/quote/:symbol', () => {
        it('should return 200 and quote for valid symbol', async () => {
            const response = await request(app)
                .get('/api/quote/AAPL')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('symbol', 'AAPL');
            expect(response.body).toHaveProperty('price');
        });

        it('should return 404 for invalid symbol', async () => {
            const response = await request(app)
                .get('/api/quote/INVALID')
                .expect('Content-Type', /json/)
                .expect(404);

            expect(response.body).toHaveProperty('error');
        });

        it('should return 400 for empty symbol', async () => {
            const response = await request(app)
                .get('/api/quote/ ')
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Symbol is required');
        });
    });
});