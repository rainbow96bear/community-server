import { Router } from "express";
import { kakaoController } from "@_controllers/external/kakao";
import { userController } from "@_controllers/external/user";
import validateIdMiddleware from "src/middlewares/validateIdMiddleware";
import { postController } from "@_controllers/external/post";
import { categoryController } from "@_controllers/external/category";

const router = Router();

// oauth
router.post("/auth/kakao/userinfo", kakaoController.getUserInfo);

// user
router.get("/userinfos/:id", userController.getInfo);
router.put(
  "/userinfos/:id",
  userController.uploadImage,
  validateIdMiddleware,
  userController.patchInfo
);

// post
router.post("/posts", validateIdMiddleware, postController.upload);
router.get("/posts/:id", postController.get);
router.put("/posts/:id", validateIdMiddleware, postController.edit);
router.delete("/posts/:id", validateIdMiddleware, postController.delete);

// category
router.get("/categories", categoryController.get);

export default router;
