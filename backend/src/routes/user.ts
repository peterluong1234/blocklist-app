import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);

export default router;