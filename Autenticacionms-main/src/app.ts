import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import roleRoutes from './routes/role.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/roles', roleRoutes);
app.use('/users', userRoutes)

export default app;