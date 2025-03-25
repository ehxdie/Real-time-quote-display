import { getQuote } from '../../services/quoteService';

describe('QuoteService', () => {
    describe('getQuote', () => {
        it('should return quote for valid symbol', () => {
            const quote = getQuote('AAPL');
            expect(quote).toBeDefined();
            expect(quote?.symbol).toBe('AAPL');
            expect(typeof quote?.price).toBe('number');
        });

        it('should return null for invalid symbol', () => {
            const quote = getQuote('INVALID');
            expect(quote).toBeNull();
        });
    });
});