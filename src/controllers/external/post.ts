import { postService } from "@_services/post";
import { Request, Response } from "express";
class PostController {
  upload = async (req: Request, res: Response) => {
    try {
      const userId = req.session.userInfo?.id;
      const post = req.body.post;

      if (!userId) {
        return res.status(400).json({ message: "User not authenticated" });
      }

      const { success, postId } = await postService.upload(userId, post);
      if (success) {
        res.status(200).json({ success, postId });
      } else {
        res.status(500).json({ message: "Failed to upload post" });
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const postId = req.params.id;
      const post = await postService.get(postId); // Sequelize의 findByPk 메서드로 게시물 조회

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ post });
    } catch (error) {
      console.error("Error fetching post:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the post" });
    }
  };

  getPostList = async (req: Request, res: Response) => {
    try {
      const { category, subcategory } = req.params;
      const page = req.query.p as string;
      const postList = await postService.getPostList(
        category,
        subcategory,
        page
      );

      if (!postList) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ postList });
    } catch (error) {
      console.error("Error fetching post:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the post" });
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const postId = req.params.id;
      const post = req.body.post;
      const { success } = await postService.edit(postId, post); // Sequelize의 findByPk 메서드로 게시물 조회

      if (!success) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({ success, postId });
    } catch (error) {
      console.error("Error fetching post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the post" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const postId = req.params.id;
      const userId = req.body.userId;
      const result = await postService.delete(postId, userId!);
      if (!result) {
        return res.status(500);
      }
      res.status(200).json({ sucess: true });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ sucess: false });
    }
  };
}

export const postController = new PostController();
