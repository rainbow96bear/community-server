import { Request, Response } from "express";
import { categoryService } from "@_services/category";

class CategoryController {
  get = async (req: Request, res: Response) => {
    try {
      const category = await categoryService.getCategoriesAndSubcategories();
      console.log("category", category);
      res.status(200).send({ category });
    } catch (error) {
      console.error("Error uploading post:", error);
      res.status(500).send("Internal server error");
    }
  };
}

export const categoryController = new CategoryController();
