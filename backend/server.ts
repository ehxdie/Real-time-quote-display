// src/app.ts
import express from 'express';
import cors from 'cors';
import  quoteRoutes from './routes/quoteRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', quoteRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});