import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
   res.status(200).json({status: 'OK', message: 'SaversToolkit API is running'}); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});