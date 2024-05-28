import { Router } from "express";
import { kakaoController } from "@_controllers/external/kakao";
import validateIdMiddleware from "src/middlewares/validateIdMiddleware";
import { user } from "@_controllers/external/user";

const router = Router();

// oauth
router.post("/auth/kakao/userinfo", kakaoController.getUserInfo);

// router.get("/userinfo", validateIdMiddleware, user.getInfo);

export default router;
