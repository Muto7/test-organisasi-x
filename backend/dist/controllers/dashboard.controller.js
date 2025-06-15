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
exports.getDashboardData = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        const startToday = (0, date_fns_1.startOfDay)(now);
        // Total seluruh pendaftar
        const totalAll = yield prisma.pendaftaran.count();
        // Total pendaftar hari ini
        const totalToday = yield prisma.pendaftaran.count({
            where: {
                createdAt: {
                    gte: startToday
                }
            }
        });
        // Grafik: jumlah per 5 menit dalam 30 menit terakhir
        const grafik = [];
        for (let i = 30; i > 0; i -= 5) {
            const start = (0, date_fns_1.subMinutes)(now, i);
            const end = (0, date_fns_1.subMinutes)(now, i - 5);
            const count = yield prisma.pendaftaran.count({
                where: {
                    createdAt: {
                        gte: start,
                        lt: end
                    }
                }
            });
            grafik.push({
                waktu: `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`,
                total: count
            });
        }
        res.status(200).json({
            totalAll,
            totalToday,
            grafik
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memuat data dashboard' });
    }
});
exports.getDashboardData = getDashboardData;
