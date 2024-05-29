import { Router } from "express";
import multer from "multer";
import { kakaoController } from "@_controllers/external/kakao";
import { userController } from "@_controllers/external/user";
import validateIdMiddleware from "src/middlewares/validateIdMiddleware";

const router = Router();

// oauth
router.post("/auth/kakao/userinfo", kakaoController.getUserInfo);

router.get("/userinfo", userController.getInfo);
router.patch(
  "/userinfo",
  userController.uploadImage,
  validateIdMiddleware,
  userController.patchInfo
);

export default router;
