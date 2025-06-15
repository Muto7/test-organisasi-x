import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'SECRET';

export const verifyToken = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log('Header Authorization:', req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Token tidak ditemukan' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;

      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({ error: 'Forbidden: Role tidak diizinkan' });
        return;
      }

      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Token tidak valid atau expired' });
    }
  };
};

