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
exports.profile = exports.signIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import user from "../models/user";
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // creating user
    const { username, email, password } = req.body;
    const user = new User_1.default({ username, email, password });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    //token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || "4N07H3RT0K3N");
    res.header("auth-token", token).json(savedUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.status(400).json("Invalid email or password");
    const isValidPassword = yield user.validatePassword(password);
    if (isValidPassword)
        return res.status(400).json("Invalid Password");
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || "4N07H3RT0K3N", { expiresIn: 60 * 60 * 24 });
    res.header("auth-token", token).json(user);
});
exports.signIn = signIn;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId);
    if (!user)
        return res.status(400).json("No User found");
    res.json(user);
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map