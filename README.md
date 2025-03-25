# Real-time Stock Quote Display

A full-stack application for real-time stock quote monitoring built with React and Node.js. The application provides real-time stock price updates, supporting multiple stock symbols and an intuitive user interface.

## Project Overview

The Real-time Stock Quote Display is a modern web application that enables users to track stock prices in real-time. It features automatic price updates, dynamic price fluctuations, and a clean, responsive interface for optimal user experience.

## Features

### Quote Monitoring
- Real-time Stock Price Updates
- Multiple Stock Symbol Support
- Price History Tracking
- Dynamic Price Fluctuations

### User Interface
- Clean, Responsive Design
- Real-time Price Updates
- Visual Price Change Indicators
- Error Handling
- Loading States


## Tech Stack

### Frontend:
- React (TypeScript)
- React Query for Data Fetching
- CSS for Styling
- Jest & React Testing Library

### Backend:
- Node.js
- Express.js
- TypeScript
- Jest for Testing
- Debug for Logging

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Real-time-quote-display.git
cd Real-time-quote-display
```

2. Setup Backend
```bash
cd backend
npm install
npm run build
npm start
```

3. Setup Frontend
```bash
cd client
npm install
npm start
```

## Environment Configuration

### Backend Configuration (.env)
```
PORT=5000
```

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## API Documentation

The API provides the following endpoints:

### Quote Endpoints

- `GET /api/quote/:symbol?` - Get real-time quote for a specific symbol

Example Response:
```json
{
    "symbol": "AAPL",
    "price": 150.25
}
```

## Development

### Project Structure

```
├── backend/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── dist/
└── client/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── types/
    │   
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

The project includes Unit test for both frontend and backend:


## License

This project is licensed under the MIT License - see the LICENSE file for details.
