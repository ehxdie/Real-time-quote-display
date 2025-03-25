import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { quoteApi } from '../api/quoteApi';

export function QuoteDisplay() {
    const [symbol, setSymbol] = useState('');
    const [isPolling, setIsPolling] = useState(false);
    const [validationError, setValidationError] = useState('');

    const {
        data: quote,
        error,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['quote', symbol],
        queryFn: () => quoteApi.getQuote(symbol),
        enabled: Boolean(symbol) && isPolling,
        refetchInterval: isPolling ? 2000 : false,
        retry: false
    });

    const validateSymbol = (value: string) => {
        if (!value.trim()) {
            setValidationError('Symbol is required');
            return false;
        }

        setValidationError('');
        return true;
    };

    const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setSymbol(value);
        validateSymbol(value);
    };

    const handleGetQuote = () => {
        if (!validateSymbol(symbol)) return;
        setIsPolling(true);
    };

    const handleStopPolling = () => {
        setIsPolling(false);
    };

    const formatTimestamp = (date: Date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="App">
            <div className="quote-container">
                <h1>Stock Quote Tracker</h1>
                <div className="input-group">
                    <input
                        type="text"
                        value={symbol}
                        onChange={handleSymbolChange}
                        placeholder="Enter stock symbol (e.g., AAPL)"
                    />
                    <button
                        onClick={handleGetQuote}
                        disabled={isPolling || !symbol || Boolean(validationError)}
                    >
                        Get Quote
                    </button>
                    {isPolling && (
                        <button
                            onClick={handleStopPolling}
                            className="stop-button"
                        >
                            Stop Updates
                        </button>
                    )}
                </div>

                {validationError && (
                    <div className="error">{validationError}</div>
                )}

                {isError && (
                    <div className="error">
                        {error instanceof Error ? error.message : 'Failed to fetch quote'}
                    </div>
                )}

                {isLoading && <div className="loading">Loading...</div>}

                {quote && (
                    <div className="quote-display">
                        <h2>{quote.symbol}</h2>
                        <p className="price">${quote.price.toFixed(2)}</p>
                        <p className="timestamp">
                            Last updated: {formatTimestamp(new Date())}
                        </p>
                        {isPolling && (
                            <p className="update-status">
                                Auto-updating every 2 seconds...
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}