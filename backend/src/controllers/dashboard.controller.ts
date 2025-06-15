import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { subMinutes, startOfDay } from 'date-fns';

const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const startToday = startOfDay(now);

    // Total seluruh pendaftar
    const totalAll = await prisma.pendaftaran.count();

    // Total pendaftar hari ini
    const totalToday = await prisma.pendaftaran.count({
      where: {
        createdAt: {
          gte: startToday
        }
      }
    });

    // Grafik: jumlah per 5 menit dalam 30 menit terakhir
    const grafik = [];

    for (let i = 30; i > 0; i -= 5) {
      const start = subMinutes(now, i);
      const end = subMinutes(now, i - 5);

      const count = await prisma.pendaftaran.count({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memuat data dashboard' });
  }
};
