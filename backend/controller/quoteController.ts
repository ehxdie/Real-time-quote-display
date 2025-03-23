import { Request, Response } from "express";
import { getQuote } from "../services/quoteService";
import debugLib from "debug";

const debug = debugLib("app:quoteController");

/**
 * Get a quote for a specific symbol
 */
export const getQuoteBySymbol = (req: Request, res: Response): void => {
    const symbol = req.params.symbol?.trim().toUpperCase();

    if (!symbol) {
        debug("Validation Error: Symbol is required");
        res.status(400).json({ error: "Symbol is required" });
        return;
    }

    try {
        const quote = getQuote(symbol);

        if (!quote) {
            debug(`Quote not found for symbol: ${symbol}`);
            res.status(404).json({ error: `Quote not found for symbol: ${symbol}` });
            return;
        }

        debug(`Quote fetched successfully for symbol: ${symbol}`, quote);
        res.json(quote);
    } catch (error) {
        debug(`Unexpected error while fetching quote for ${symbol}:`, error);
        res.status(500).json({ error: "Internal server error" });
    }
};
