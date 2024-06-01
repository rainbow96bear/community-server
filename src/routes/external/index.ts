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
router.get("/profiles/:userId", userController.getInfo);
router.put(
  "/profiles/:userId",
  userController.uploadImage,
  validateIdMiddleware,
  userController.patchInfo
);

// post
router.get("/posts/:category?/:subcategory?", postController.getPostList);
router.get("/posts/:category/:subcategory/:id", postController.get);
router.post("/posts", validateIdMiddleware, postController.upload);
router.post("/posts/:id", validateIdMiddleware, postController.delete);
router.put("/posts/:id", validateIdMiddleware, postController.edit);

// category
router.get("/categories", categoryController.get);

export default router;
