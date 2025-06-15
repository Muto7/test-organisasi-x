import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

// Semua admin bisa akses dashboard
router.get('/', verifyToken(), getDashboardData);

export default router;
