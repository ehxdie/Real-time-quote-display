import { Quote } from "../models/quoteModel";
import debugLib from "debug";

const debug = debugLib("app:quoteService");

// Predefined array of symbols and prices
const quotes: Quote[] = [
    { symbol: "AAPL", price: 170.5 },
    { symbol: "GOOGL", price: 2845.3 },
    { symbol: "BTCUSD", price: 43621.5 },
    { symbol: "TSLA", price: 900.2 },
    { symbol: "MSFT", price: 310.75 },
];

/**
 * Get the current price for an existing symbol
 */
function getPrice(symbol: string): number | null {
    const quote = quotes.find((quote) => quote.symbol === symbol);
    if (quote) {
        debug(`Retrieved price for ${symbol}: ${quote.price}`);
    } else {
        debug(`Symbol ${symbol} not found`);
    }
    return quote ? quote.price : null;
}

/**
 * Update the price with a small fluctuation
 */
function updatePrice(symbol: string): number | null {
    const quote = quotes.find((quote) => quote.symbol === symbol);
    if (!quote) {
        debug(`Update failed: Symbol ${symbol} not found`);
        return null;
    }

    // Apply a small random fluctuation (-2% to +2%)
    const fluctuation = quote.price * (Math.random() * 0.04 - 0.02);
    quote.price = parseFloat((quote.price + fluctuation).toFixed(2));

    debug(`Updated price for ${symbol}: ${quote.price}`);

    return quote.price;
}

/**
 * Get a quote for a specific symbol (only if it exists)
 */
export function getQuote(symbol: string): Quote | null {
    const price = getPrice(symbol);
    if (price === null) return null; // Return null if symbol not found

    const quote: Quote = {
        symbol,
        price,
    };

    debug(`Returning quote: ${JSON.stringify(quote)}`);

    // Simulate price update after delay (1-3 seconds)
    setTimeout(() => {
        updatePrice(symbol);
    }, 1000 + Math.random() * 2000);

    return quote;
}
