"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const pendaftaran_routes_1 = __importDefault(require("./routes/pendaftaran.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const rekap_routes_1 = __importDefault(require("./routes/rekap.routes"));
// const prisma = new PrismaClient();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // asal frontend kamu
    credentials: true, // izinkan cookie dan header auth
}));
app.use(express_1.default.json());
// app.get('/api/test-db', async (req, res) => {
//     try {
//       const allUsers = await prisma.user.findMany();
//       res.json(allUsers);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Database error' });
//     }
//   });
app.use('/api/pendaftaran', pendaftaran_routes_1.default);
app.use('/api', auth_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api', rekap_routes_1.default);
exports.default = app;
