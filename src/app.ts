import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes

app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello to my user crud assignment!');
});

export default app;
