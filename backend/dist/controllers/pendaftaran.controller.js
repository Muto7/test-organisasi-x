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
exports.createPendaftaran = exports.getAllPendaftaran = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPendaftaran = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nik, nama, noHp, provinsi, kabupaten, kecamatan, kelurahan } = req.body;
    if (!nik || !nama || !noHp || !provinsi || !kabupaten || !kecamatan || !kelurahan) {
        res.status(400).json({ error: 'Semua field wajib diisi' });
        return;
    }
    if (!/^\d{16}$/.test(nik)) {
        res.status(400).json({ error: 'NIK harus 16 digit angka' });
        return;
    }
    try {
        const existing = yield prisma.pendaftaran.findFirst({
            where: {
                OR: [{ nik }, { noHp }]
            }
        });
        if (existing) {
            res.status(409).json({ error: 'NIK atau No HP sudah terdaftar' });
            return;
        }
        const newData = yield prisma.pendaftaran.create({
            data: { nik, nama, noHp, provinsi, kabupaten, kecamatan, kelurahan }
        });
        res.status(201).json(newData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal menyimpan data' });
    }
});
exports.createPendaftaran = createPendaftaran;
const getAllPendaftaran = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // token sudah didecode di middleware
    const { role, wilayah } = user;
    try {
        let whereClause = {};
        if (role === 'PROVINSI') {
            whereClause = { provinsi: wilayah };
        }
        else if (role === 'KABUPATEN') {
            whereClause = { kabupaten: wilayah };
        }
        else if (role === 'KECAMATAN') {
            whereClause = { kecamatan: wilayah };
        }
        else if (role === 'KELURAHAN') {
            whereClause = { kelurahan: wilayah };
        }
        // jika PUSAT maka biarkan kosong (lihat semua data)
        const data = yield prisma.pendaftaran.findMany({ where: whereClause });
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
});
exports.getAllPendaftaran = getAllPendaftaran;
