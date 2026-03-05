import "./config/env.js";

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import rescueRoutes from "./routes/rescueRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/rescue", rescueRoutes);


app.listen(process.env.PORT, ()=> console.log("server is running in port " + process.env.PORT));
