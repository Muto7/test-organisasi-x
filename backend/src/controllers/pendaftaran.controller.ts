import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createPendaftaran = async (req: Request, res: Response) => {
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
    const existing = await prisma.pendaftaran.findFirst({
      where: {
        OR: [{ nik }, { noHp }]
      }
    });

    if (existing) {
      res.status(409).json({ error: 'NIK atau No HP sudah terdaftar' });
      return;
    }

    const newData = await prisma.pendaftaran.create({
      data: { nik, nama, noHp, provinsi, kabupaten, kecamatan, kelurahan }
    });

    res.status(201).json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menyimpan data' });
  }
};

export const getAllPendaftaran = async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user; // token sudah didecode di middleware
  const { role, wilayah } = user;

  try {
    let whereClause = {};

    if (role === 'PROVINSI') {
      whereClause = { provinsi: wilayah };
    } else if (role === 'KABUPATEN') {
      whereClause = { kabupaten: wilayah };
    } else if (role === 'KECAMATAN') {
      whereClause = { kecamatan: wilayah };
    } else if (role === 'KELURAHAN') {
      whereClause = { kelurahan: wilayah };
    }

    const data = await prisma.pendaftaran.findMany({ where: whereClause });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
};


export { createPendaftaran };
