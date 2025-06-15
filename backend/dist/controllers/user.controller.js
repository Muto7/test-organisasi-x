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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, wilayah } = req.body;
    if (!username || !password || !role || !wilayah) {
        res.status(400).json({ error: 'Semua field wajib diisi' });
        return;
    }
    try {
        const existing = yield prisma.user.findUnique({ where: { username } });
        if (existing) {
            res.status(409).json({ error: 'Username sudah digunakan' });
            return;
        }
        const hashed = yield bcrypt_1.default.hash(password, 10);
        yield prisma.user.create({
            data: {
                username,
                password: hashed,
                role,
                wilayah
            }
        });
        res.status(201).json({ message: 'User berhasil dibuat' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menambahkan pengguna' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const { password, role, wilayah } = req.body;
    try {
        const updateData = { role, wilayah };
        if (password) {
            updateData.password = yield bcrypt_1.default.hash(password, 10);
        }
        const updated = yield prisma.user.update({
            where: { id: userId },
            data: updateData
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Gagal mengubah data pengguna' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        yield prisma.user.delete({ where: { id: userId } });
        res.json({ message: 'User berhasil dihapus' });
    }
    catch (error) {
        res.status(500).json({ error: 'Gagal menghapus user' });
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
});
exports.getAllUsers = getAllUsers;
