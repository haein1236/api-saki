import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from  "./route/auth.route";

const app = express();
const PORT: number = 3000;
const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Autorise les clients non-browser (curl/postman) + origins whitelistées.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin non autorisée par CORS"));
    },
    credentials: true,
  })
);

// routes globales
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API en TypeScript 🚀");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${PORT}`);
});
