import Posts from "@_models/Posts";
import Users from "@_models/Users";
import { Post, PostList, PostsByCategory } from "@_types/index";
import { Op } from "sequelize";

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
      console.log(newPost);
      console.log("Post uploaded successfully:", newPost.toJSON());
      return { success: true, postId: newPost.toJSON().id }; // 게시물 ID를 반환
    } catch (error) {
      console.error("Error uploading post:", error);
      return { success: false, postId: null };
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
    let posts;
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

      posts = {
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
    return posts;
  };

  getPostList = async (
    category?: string,
    subcategory?: string,
    page?: string
  ) => {
    try {
      let whereCondition = {};

      if (category && subcategory) {
        whereCondition = {
          category: category,
          subcategory: subcategory,
        };
      } else if (category) {
        whereCondition = {
          category: category,
        };
      }

      let startId = 1;
      let endId = 10;
      if (page) {
        const pageNumber = parseInt(page, 10);
        if (pageNumber > 1) {
          startId = (pageNumber - 1) * 10 + 1;
          endId = pageNumber * 10;
        }
      }

      const categories = await Posts.findAll({
        attributes: ["category"],
        group: ["category"],
        where: whereCondition,
      });
      const postList: PostsByCategory = {};

      for (const categoryObj of categories) {
        const categoryName = categoryObj.category;
        const posts = await Posts.findAll({
          where: {
            ...whereCondition,
            category: categoryName,
          },
          attributes: ["category", "subcategory", "id", "title"],
          include: [
            {
              model: Users,
              as: "user",
              attributes: ["nickname"],
            },
          ],
          order: [["createdAt", "DESC"]],
          limit: 10,
        });
        postList[categoryName] = posts.map((post) => ({
          id: post.id.toString(),
          category: post.category,
          subcategory: post.subcategory,
          title: post.title,
          userId: post.userId?.toString(),
          user: post.dataValues.user
            ? { nickname: post.dataValues.user.nickname }
            : undefined,
        }));
      }

      console.log("자 이번에 되어주라", postList);
      return postList;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Error fetching posts");
    }
  };

  edit = async (postId: string, post: Post) => {
    try {
      const existingPost = await Posts.findByPk(postId);
      if (!existingPost) {
        return { success: false, postId: null };
      }

      await existingPost.update({
        category: post.category,
        subcategory: post.subcategory,
        title: post.title,
        content: post.content,
      });

      console.log("Post edited successfully:", existingPost.toJSON());
      return { success: true, postId: existingPost.id };
    } catch (error) {
      console.error("Error editing post:", error);
      return { success: false, postId: null };
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
