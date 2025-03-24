import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuoteDisplay } from './components/quoteDisplay';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuoteDisplay />
    </QueryClientProvider>
  );
}

export default App;