import { Request, Response } from "express";
import { categoryService } from "@_services/category";

class CategoryController {
  get = async (req: Request, res: Response) => {
    try {
      const category = await categoryService.getCategoriesAndSubcategories();
      res.status(200).json({ category });
    } catch (error) {
      console.error("Error uploading post:", error);
      res.status(500).json({ messeage: "Error uploading post" });
    }
  };
}

export const categoryController = new CategoryController();
