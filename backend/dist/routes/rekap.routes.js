"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rekap_controller_1 = require("../controllers/rekap.controller");
const router = express_1.default.Router();
router.get('/rekap/provinsi', rekap_controller_1.getRekapProvinsi);
router.get('/pendaftar/provinsi', rekap_controller_1.getPendaftarProvinsi);
exports.default = router;
