import { profile, signIn, signUp } from "../controllers/auth.controller";
import { Router } from "express";
import { validateToken } from "../libs/validateToken";
const router: Router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/profile", validateToken, profile);

export default router;
 