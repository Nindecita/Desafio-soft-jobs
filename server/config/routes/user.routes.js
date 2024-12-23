import express from "express";
import {
  findUser,
  loginUser,
  registerUser,
} from "../../src/controllers/users.controller.js";
import { verifyToken } from "../../middlewares/verify.token.middleware.js";
const router = express.Router();

router.post("/usuarios", registerUser);
router.post("/login", loginUser);
router.get("/usuarios", verifyToken, findUser)

export default router;
