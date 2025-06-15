import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRekapProvinsi = async (req: Request, res: Response) => {
  try {
    const result = await prisma.pendaftaran.groupBy({
      by: ['provinsi'],
      _count: { _all: true }
    });

    const data = result.map((r) => ({
      wilayah: r.provinsi,
      total: r._count._all,
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal ambil rekap provinsi' });
  }
};

export const getPendaftarProvinsi = async (req: Request, res: Response) => {
    try {
      const data = await prisma.pendaftaran.findMany({
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
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Gagal mengambil data pendaftar' });
    }
  };
