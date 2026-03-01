import express from "express";
import { createReport,getAllReports } from "../controllers/rescueControllers.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", getAllReports);

export default router;