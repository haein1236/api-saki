import bcrypt from "bcrypt";
import { AuthRepository } from "../repositorie/auth.repositorie";

export class AuthService {
  private repo = new AuthRepository();

  async register(data: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
  }) {

    const existingUser = await this.repo.findUserByEmail(data.email);

    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    const hash = await bcrypt.hash(data.password, 10);

    return this.repo.createUser({
      ...data,
      password: hash
    });
  }

  async login(email: string, password: string) {

    const user = await this.repo.findUserByEmail(email);

    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      throw new Error("Mot de passe incorrect");
    }

    console.log('auth ok')
    return {
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom
    };
  }
}
