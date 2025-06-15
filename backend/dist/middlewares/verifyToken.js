"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'SECRET';
const verifyToken = (roles = []) => {
    return (req, res, next) => {
        console.log('Header Authorization:', req.headers.authorization);
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized: Token tidak ditemukan' });
            return;
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            if (roles.length && !roles.includes(decoded.role)) {
                res.status(403).json({ error: 'Forbidden: Role tidak diizinkan' });
                return;
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(403).json({ error: 'Token tidak valid atau expired' });
        }
    };
};
exports.verifyToken = verifyToken;
