"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
// Semua admin bisa akses dashboard
router.get('/', (0, verifyToken_1.verifyToken)(), dashboard_controller_1.getDashboardData);
exports.default = router;
