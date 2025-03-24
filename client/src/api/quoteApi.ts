import axios from 'axios';
import { Quote }  from '../types/quotes';

export const quoteApi = {
    getQuote: async (symbol: string): Promise<Quote> => {
        const { data } = await axios.get(`http://localhost:5000/api/quote/${symbol}`);
        return data;
    }
};