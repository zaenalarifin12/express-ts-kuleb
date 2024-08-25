import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async register(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = UserRepository.create({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
    });
    return UserRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await UserRepository.findOneBy({ email });
    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      "secret_key",
      { expiresIn: "1h" }
    );
    return { token, user };
  }
}
