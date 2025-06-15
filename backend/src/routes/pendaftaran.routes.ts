import { Router } from 'express';
import { createPendaftaran, getAllPendaftaran } from '../controllers/pendaftaran.controller';
import { verifyToken } from '../middlewares/verifyToken';



const router = Router();


router.post('/', createPendaftaran);
router.get('/', verifyToken(), getAllPendaftaran);


export default router;
