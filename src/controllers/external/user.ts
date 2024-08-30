import { Request, Response } from "express";
import { userService } from "@_services/user";
import multer from "multer";
import path from "path";

class UserController {
  private upload;
  constructor() {
    this.upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "files/");
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, Date.now() + ext);
        },
      }),
    });
  }
  getInfo = async (req: Request, res: Response) => {
    try {
      const profile = await userService.getUserInfo(req.params.userId);
      res.status(200).json({ profile });
    } catch (error) {
      res.status(403).json({ message: "Forbidden: User session not found" });
    }
  };
  patchInfo = async (req: Request, res: Response) => {
    try {
      const { userId, nickname, wallet } = req.body;
      const profileImage = req.file;
      const newProfile = req.file
        ? {
            id: userId,
            nickname: nickname,
            wallet: wallet || "",
            profile_image: `${
              process.env.IMG_SERVER_URL! + profileImage?.filename
            }`,
          }
        : {
            id: userId,
            nickname: nickname,
            wallet: wallet || "",
          };
      const updatedUserInfo = await userService.updateUserInfo(
        userId,
        newProfile
      );
      res.status(200).json({ profile: updatedUserInfo });
    } catch (error) {
      res.status(403).json({ message: "Fail to Update UserInfo" });
    }
  };
  uploadImage = (req: Request, res: Response, next: any) => {
    this.upload.single("profile_image")(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        res.status(400).json({ message: "File upload error" });
      } else if (err) {
        res.status(500).json({ message: "Server error" });
      } else {
        next();
      }
    });
  };
}

export const userController = new UserController();
