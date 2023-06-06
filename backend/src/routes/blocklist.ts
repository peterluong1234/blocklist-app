import express from "express";
import * as BlocklistController from "../controllers/blocklist";

// router is reference to app from app.ts
// instead using app, express.Router() helps define a variable in place of app
const router = express.Router();

router.get("/:userId", BlocklistController.getBlocklists);
router.get("/blocklist/:blocklistId", BlocklistController.getBlockList);
router.post("/", BlocklistController.createBlocklist);
router.patch("/:blocklistId", BlocklistController.updateBlocklist);
router.delete("/:blocklistId", BlocklistController.deleteBlocklist);

export default router;