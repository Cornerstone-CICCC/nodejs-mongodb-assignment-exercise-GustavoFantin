import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import productRouter from './routes/product.route';
dotenv.config()

// Create server
const app = express();

// Middleware
app.use(express.json());

//Routes
app.use('/product', productRouter)

//Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("404 server error. Page not found.")
})

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3000;

if (!process.env.DATABASE_URI) {
  throw Error (`Missing connection string`)
}
const MONGODB_URI = process.env.DATABASE_URI
  
mongoose
  .connect(MONGODB_URI, { dbName: 'store' })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));