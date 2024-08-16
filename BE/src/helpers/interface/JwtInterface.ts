import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  image: string;
  tier: string;
}
