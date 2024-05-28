import { Router } from "express";
import { kakaoController } from "@_controllers/external/kakao";

const router = Router();

// oauth
router.post("/auth/kakao/userinfo", kakaoController.getUserInfo);

export default router;
