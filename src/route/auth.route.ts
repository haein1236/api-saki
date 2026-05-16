import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/register", (req, res) => {
  console.log(
    `[REGISTER] tentative depuis IP=${req.ip} origin=${req.headers.origin ?? "unknown"}`
  );
  return controller.register(req, res);
});

router.post("/login", (req, res) => {
  console.log(
    `[LOGIN] tentative depuis IP=${req.ip} origin=${req.headers.origin ?? "unknown"}`
  );
  return controller.login(req, res);
});

export default router;
