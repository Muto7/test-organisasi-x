import { Router } from 'express';
import { createPendaftaran, getAllPendaftaran } from '../controllers/pendaftaran.controller';
import { verifyToken } from '../middlewares/verifyToken';



const router = Router();

// PASTIKAN di sini tidak ada `()` setelah createPendaftaran
router.post('/', createPendaftaran);
router.get('/', verifyToken(), getAllPendaftaran);


export default router;
