"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pendaftaran_controller_1 = require("../controllers/pendaftaran.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
// PASTIKAN di sini tidak ada `()` setelah createPendaftaran
router.post('/', pendaftaran_controller_1.createPendaftaran);
router.get('/', (0, verifyToken_1.verifyToken)(), pendaftaran_controller_1.getAllPendaftaran);
exports.default = router;
