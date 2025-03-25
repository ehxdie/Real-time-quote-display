import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuoteDisplay } from '../quoteDisplay';
import { quoteApi } from '../../api/quoteApi';

// Mock the quoteApi
jest.mock('../../api/quoteApi');

describe('QuoteDisplay Component', () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false }
        }
    });

    const renderComponent = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <QuoteDisplay />
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        queryClient.clear();
        jest.clearAllMocks();
    });

    it('renders input and initial state', () => {
        renderComponent();
        expect(screen.getByPlaceholderText(/enter stock symbol/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /get quote/i })).toBeInTheDocument();
    });

    it('validates symbol input', async () => {
        renderComponent();

        const input = screen.getByPlaceholderText(/enter stock symbol/i);
        const getQuoteButton = screen.getByRole('button', { name: /get quote/i });

        // Type invalid input (spaces)
        await userEvent.type(input, '   ');

        // Try to click the button (validation happens on input change)
        expect(screen.getByText('Symbol is required')).toBeInTheDocument();
        expect(getQuoteButton).toBeDisabled();

        // Type valid input
        await userEvent.clear(input);
        await userEvent.type(input, 'AAPL');

        // Error message should disappear and button should be enabled
        expect(screen.queryByText('Symbol is required')).not.toBeInTheDocument();
        expect(getQuoteButton).toBeEnabled();
    });

    it('fetches and displays quote', async () => {
        const mockQuote = { symbol: 'AAPL', price: 150.25 };
        (quoteApi.getQuote as jest.Mock).mockResolvedValue(mockQuote);

        renderComponent();

        const input = screen.getByPlaceholderText(/enter stock symbol/i);
        const getQuoteButton = screen.getByRole('button', { name: /get quote/i });

        await userEvent.type(input, 'AAPL');
        fireEvent.click(getQuoteButton);

        await waitFor(() => {
            expect(screen.getByText('AAPL')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('$150.25')).toBeInTheDocument();
        });
    });

    it('handles error state', async () => {
        (quoteApi.getQuote as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        renderComponent();

        const input = screen.getByPlaceholderText(/enter stock symbol/i);
        const getQuoteButton = screen.getByRole('button', { name: /get quote/i });

        await userEvent.type(input, 'AAPL');
        fireEvent.click(getQuoteButton);

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
        });
    });

    it('stop polling functionality', async () => {
        const mockQuote = { symbol: 'AAPL', price: 150.25 };
        (quoteApi.getQuote as jest.Mock).mockResolvedValue(mockQuote);

        renderComponent();

        const input = screen.getByPlaceholderText(/enter stock symbol/i);
        await userEvent.type(input, 'AAPL');

        const getQuoteButton = screen.getByRole('button', { name: /get quote/i });
        fireEvent.click(getQuoteButton);

        // Wait for polling to start
        await waitFor(() => {
            expect(screen.getByText(/auto-updating/i)).toBeInTheDocument();
        });

        // Click stop button
        const stopButton = screen.getByRole('button', { name: /stop updates/i });
        fireEvent.click(stopButton);

        // Verify polling stopped
        expect(screen.queryByText(/auto-updating/i)).not.toBeInTheDocument();
    });
});