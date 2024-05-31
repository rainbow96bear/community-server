import Categories from "@_models/Categories";

class CategoryService {
  getCategoriesAndSubcategories = async () => {
    try {
      const categories = await Categories.findAll({ raw: true });

      const result: any[] = [];

      for (const categoryData of categories) {
        const { category, subcategory } = categoryData;

        let categoryObj = result.find((item) => item.category === category);
        if (!categoryObj) {
          categoryObj = { category, subcategories: [] };
          result.push(categoryObj);
        }

        categoryObj.subcategories.push({ subcategory });
      }

      return result;
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
      throw error;
    }
  };
}

export const categoryService = new CategoryService();
