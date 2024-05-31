// Categories 모델에 대한 import 구문

// 카테고리 데이터
import Categories from "./Categories";
import { categories } from "./categpriesData";

// 카테고리 데이터를 사용하여 Categories 테이블을 초기화하는 메서드
export const initializeCategories = async () => {
  try {
    // 카테고리 데이터를 순회하며 데이터베이스에 추가
    for (const categoryData of categories) {
      const category = categoryData.category;

      // 서브카테고리 추가
      if (categoryData.subcategories && categoryData.subcategories.length > 0) {
        for (const subcategoryData of categoryData.subcategories) {
          const subcategory = subcategoryData.subcategory;

          await Categories.create({
            category: category,
            subcategory: subcategory,
          });
        }
      }
    }

    console.log("Categories initialized successfully.");
  } catch (error) {
    console.error("Error initializing categories:", error);
  }
};
