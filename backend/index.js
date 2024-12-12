import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
const PORT = 7000;
import { ConnectDB } from "./lib/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import path from "path";
import { fileURLToPath } from "url";


// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`The server running on http://localhost:${PORT}`);
  ConnectDB();
});