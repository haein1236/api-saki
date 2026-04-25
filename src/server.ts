import express, { Request, Response } from "express";
import authRoutes from  "./route/auth.route";

const app = express();
const PORT: number = 3000;

app.use(express.json());

// routes globales
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API en TypeScript 🚀");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${PORT}`);
});
