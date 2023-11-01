import { useEffect } from "react";
import { FoodItem } from "../../types";
import { useStateValue } from "../context/StateProvider";
import { fetchFoodData } from "./functions";

export const FilterFood = (categoryId: string): FoodItem[] => {
  
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {
    fetchFoodData(dispatch, categoryId);
  }, [categoryId, dispatch]);

  return foodItems?.filter((item: FoodItem) => item.categoryId === categoryId);
};
