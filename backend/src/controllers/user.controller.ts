import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, role, wilayah } = req.body;
  
    if (!username || !password || !role || !wilayah) {
      res.status(400).json({ error: 'Semua field wajib diisi' });
      return;
    }
  
    try {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing) {
        res.status(409).json({ error: 'Username sudah digunakan' });
        return;
      }
  
      const hashed = await bcrypt.hash(password, 10);
  
      await prisma.user.create({
        data: {
          username,
          password: hashed,
          role,
          wilayah
        }
      });
  
      res.status(201).json({ message: 'User berhasil dibuat' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal menambahkan pengguna' });
    }
  };
  


export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { password, role, wilayah } = req.body;

  try {
    const updateData: any = { role, wilayah };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengubah data pengguna' });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus user' });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
