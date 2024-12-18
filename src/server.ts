import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cardRoutes from './routes/card'

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: '*' }));

// Base API route
app.get('/', (req, res) => {
  res.send('Hello! Base API route');
});

// Card routes
app.use('/card', cardRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
