export interface Quote {
    symbol: string;
    price: number;
    timestamp?: Date; // Optional to maintain compatibility
}