import request from 'supertest';
import express from 'express';
import { getQuoteBySymbol } from '../../controller/quoteController';

const app = express();
app.get('/api/quote/:symbol', getQuoteBySymbol);

describe('QuoteController', () => {
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
            await request(app)
                .get('/api/quote/INVALID')
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should return 400 for empty symbol', async () => {
            await request(app)
                .get('/api/quote/ ')
                .expect('Content-Type', /json/)
                .expect(400);
        });
    });
});