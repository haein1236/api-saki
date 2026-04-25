import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

const service = new AuthService();

export class AuthController {

  async register(req: Request, res: Response) {
    try {
      const user = await service.register(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await service.login(
        req.body.email,
        req.body.password
      );
      console.log('utilisateur connexion')
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
