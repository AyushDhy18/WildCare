import express from "express";
import { createReport,getAllReports } from "../controllers/rescueControllers.js";
import upload from "../upload.js";

const router = express.Router();

router.post("/",upload.single("image"), createReport);
router.get("/", getAllReports);

export default router;