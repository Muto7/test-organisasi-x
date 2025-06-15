import express from 'express';
import { getRekapProvinsi, getPendaftarProvinsi } from '../controllers/rekap.controller';

const router = express.Router();
router.get('/rekap/provinsi', getRekapProvinsi);
router.get('/pendaftar/provinsi', getPendaftarProvinsi);
export default router;
