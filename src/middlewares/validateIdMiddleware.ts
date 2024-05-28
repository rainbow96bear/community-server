import { Request, Response, NextFunction } from "express";

const validateIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionPlatform = req.session.user?.platform;
  const sessionId = req.session.user?.id;
  if (sessionId && sessionPlatform) {
    next();
  } else {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res
          .status(500)
          .json({ message: "Error during session destruction" });
      }
      res.clearCookie("sessionID");
      res.status(403).json({ message: "Forbidden: ID does not match" });
    });
  }
};

export default validateIdMiddleware;
