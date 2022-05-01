"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = require("express");
const validateToken_1 = require("../libs/validateToken");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.signUp);
router.post("/signin", auth_controller_1.signIn);
router.get("/profile", validateToken_1.validateToken, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map