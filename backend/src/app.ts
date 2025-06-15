import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';

import pendaftaranRoutes from './routes/pendaftaran.routes';
import dashboardRoutes from './routes/dashboard.routes';
import userRoutes from './routes/user.routes';
import rekapRoutes from './routes/rekap.routes';

// const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));
app.use(express.json());
// app.get('/api/test-db', async (req, res) => {
//     try {
//       const allUsers = await prisma.user.findMany();
//       res.json(allUsers);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Database error' });
//     }
//   });

 app.use('/api/pendaftaran', pendaftaranRoutes);
 app.use('/api', authRoutes);
 app.use('/api/dashboard', dashboardRoutes);
 app.use('/api/users', userRoutes);
 app.use('/api', rekapRoutes);

export default app;