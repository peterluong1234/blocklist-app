import express from "express";
import * as UserController from "../controllers/users";
import ensureLoggedIn from "../../config/ensureLoggedIn";

const router = express.Router();


router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/check-token", ensureLoggedIn, UserController.checkToken);

export default router;