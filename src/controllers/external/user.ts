import { Request, Response } from "express";

class User {
  getInfo = async (req: Request, res: Response) => {
    try {
      const userInfo = req.session.user;
      res.send({ user: userInfo });
    } catch (error) {
      res.status(403).json({ message: "Forbidden: User session not found" });
    }
  };
}

export const user = new User();
