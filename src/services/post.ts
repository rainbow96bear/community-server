import Posts from "@_models/Posts";
import Users from "@_models/Users";
import { Post } from "@_types/post";

class PostService {
  upload = async (user_id: string, post: Post) => {
    try {
      const newPost = await Posts.create({
        category: post.category,
        subcategory: post.subcategory,
        title: post.title,
        content: post.content,
        userId: user_id,
      });

      console.log("Post uploaded successfully:", newPost.toJSON());
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  get = async (id: string) => {
    const result = await Posts.findOne({
      where: { id },
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["nickname"],
        },
      ],
    });
    let post;
    if (result) {
      const {
        id,
        category,
        subcategory,
        title,
        content,
        createdAt,
        userId,
        user,
      } = result.dataValues;
      const userNickname = user.dataValues.nickname;

      post = {
        id,
        category,
        subcategory,
        title,
        content,
        createdAt,
        userId,
        user: {
          nickname: userNickname,
        },
      };
    }
    return post;
  };

  edit = async (postId: string, post: Post) => {
    try {
      const [affectedRows] = await Posts.update(
        {
          title: post.title,
          content: post.content,
        },
        {
          where: { id: postId },
        }
      );

      if (affectedRows > 0) {
        console.log("Post updated successfully");
        return { success: true };
      } else {
        console.log("No post found with the given id");
        return { success: false };
      }
    } catch (error) {
      console.error("Error updating post:", error);
      return { success: false };
    }
  };
  delete = async (postId: string, userId: string) => {
    try {
      const deletedPost = await Posts.destroy({
        where: {
          id: postId,
          userId: userId,
        },
      });

      if (deletedPost > 0) {
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  };
}

export const postService = new PostService();
