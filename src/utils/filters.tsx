import { useEffect } from "react";
import { FoodItem } from "../../types";
import { useStateValue } from "../context/StateProvider";
import { fetchFoodData } from "./functions";

export const FilterFood = (categoryId: string): FoodItem[] => {

  const [{ foodItems }, dispatch] = useStateValue();

  return foodItems?.filter((item: FoodItem) => item.categoryId === categoryId);
};
