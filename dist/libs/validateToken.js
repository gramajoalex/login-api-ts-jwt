"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json("Access denied");
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "4N07H3RT0K3N");
    req.userId = payload._id;
    next();
};
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map