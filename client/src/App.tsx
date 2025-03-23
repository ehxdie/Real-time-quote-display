import React, { useState } from 'react';
import './App.css';

interface Quote {
  symbol: string;
  price: number;
}

function App() {
  const [symbol, setSymbol] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string>('');

  const handleGetQuote = async () => {
    if (!symbol) {
      setError('Please enter a symbol');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/quote/${symbol}`);
      if (!response.ok) {
        throw new Error('Quote not found');
      }
      const data = await response.json();
      setQuote(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch quote');
      setQuote(null);
    }
  };

  return (
    <div className="App">
      <div className="quote-container">
        <h1>Stock Quote Tracker</h1>

        <div className="input-group">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., AAPL)"
          />
          <button onClick={handleGetQuote}>Get Quote</button>
        </div>

        {error && <div className="error">{error}</div>}

        {quote && (
          <div className="quote-display">
            <h2>{quote.symbol}</h2>
            <p className="price">${quote.price.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
