import { Quote } from "../models/quoteModel";
import debugLib from "debug";

const debug = debugLib("app:quoteService");

// Predefined array of symbols with dynamic prices
const quotes: Quote[] = [
    { symbol: "AAPL", price: 170.5 },
    { symbol: "GOOGL", price: 2845.3 },
    { symbol: "BTCUSD", price: 43621.5 },
    { symbol: "TSLA", price: 900.2 },
    { symbol: "MSFT", price: 310.75 },
];

/**
 * Update the price for all quotes every 2 seconds
 */

function updateAllPrices() {
    quotes.forEach((quote) => {
        // Apply a small random fluctuation (-2% to +2%)
        const fluctuation = quote.price * (Math.random() * 0.04 - 0.02);
        quote.price = parseFloat((quote.price + fluctuation).toFixed(2));

        debug(`Updated price for ${quote.symbol}: ${quote.price}`);
    });
}

// Automatically update prices every 2 seconds
setInterval(updateAllPrices, 2000);


/**
 * Get a quote for a specific symbol
 */

export function getQuote(symbol: string): Quote | null {
    const quote = quotes.find((quote) => quote.symbol === symbol);
    if (!quote) {
        debug(`Symbol ${symbol} not found`);
        return null;
    }

    return {
        symbol: quote.symbol,
        price: quote.price,
    };
}


