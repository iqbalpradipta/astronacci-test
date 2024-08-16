import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../helpers/interface/JwtInterface";

export default new (class JWTAuth {
  authenticateJWT = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const authHeader = req.header("Authorization");
      const token: string | undefined = authHeader?.split(" ")[1];

      if (!token) {
        res
          .status(403)
          .json({ message: "Access Denied! Token Not Found" });
        return;
      }

      jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
        if (err) {
          res.status(403).json({ message: "Token Invalid!" });
          return;
        }

        const user = decoded as UserPayload;

        if (!allowedRoles.includes(user.data?.tier)) {
          res
            .status(403)
            .json({ message: "Access Denied! Your tier don't have access to here!" });
          return;
        }

        req.user = user;
        next();
      });
    };
  };
})();
