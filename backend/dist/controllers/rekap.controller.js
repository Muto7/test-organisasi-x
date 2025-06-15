"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendaftarProvinsi = exports.getRekapProvinsi = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getRekapProvinsi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.pendaftaran.groupBy({
            by: ['provinsi'],
            _count: { _all: true }
        });
        const data = result.map((r) => ({
            wilayah: r.provinsi,
            total: r._count._all,
        }));
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal ambil rekap provinsi' });
    }
});
exports.getRekapProvinsi = getRekapProvinsi;
const getPendaftarProvinsi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.pendaftaran.findMany({
            select: {
                nama: true,
                nik: true,
                noHp: true,
                provinsi: true,
                kabupaten: true,
                kecamatan: true,
                kelurahan: true,
                createdAt: true
            }
        });
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal mengambil data pendaftar' });
    }
});
exports.getPendaftarProvinsi = getPendaftarProvinsi;
