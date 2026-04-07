import express from "express";
import { createReport,getAllReports, getreportById } from "../controllers/rescueControllers.js";
import upload from "../upload.js";

const router = express.Router();

router.post("/",upload.single("image"), createReport);
router.get("/", getAllReports);
router.get("/:id", getreportById);

export default router;